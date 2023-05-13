import { v4 as uuid } from "uuid";
import { Email } from "../value-objects/email";
import { FirstName } from "../value-objects/first-name";
import { LastName } from "../value-objects/last-name";
import { Validator } from "../../shared/validator";
import { Result } from "../../shared/result";
import { AggregateRoot } from "../aggregate-root";
import { eventList } from "../domain-events";
import { FirstNameUpdatedEvent } from "./events/first-name-updated";
import { LastNameUpdatedEvent } from "./events/last-name-updated";
import { StudentCreated } from "./events/student-created";
import {
  StudentEvent,
  StudentEventProps,
  StudentEventTypes,
  StudentState,
  Error,
} from "./student-types";

export class Student implements AggregateRoot<StudentState, StudentEvent> {
  public readonly id: string;
  public readonly state: StudentState;
  public readonly eventsCollection: StudentEvent;

  constructor(state: StudentState) {
    this.state = state;
    this.id = uuid();
    this.eventsCollection = new eventList<
      StudentEventTypes,
      StudentEventProps
    >();

    this.eventsCollection.add(new StudentCreated(this.id, this.state));
  }

  static create(state: {
    firstName: string;
    lastName: string;
  }): Result<Student, Error[]> {
    const firstName = FirstName.create(state.firstName, Validator.validator);
    const lastName = LastName.create(state.lastName, Validator.validator);

    const email = Email.create(
      {
        firstName: firstName.value?.getValue || "",
        lastName: lastName.value?.getValue || "",
      },
      Validator.validator
    );

    if (!firstName.value || !lastName.value || !email.value) {
      const error = Validator.validate([
        firstName.error,
        lastName.error,
        email.error,
      ]);

      return Result.failure(error);
    }

    return Result.success(
      new Student({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
      })
    );
  }

  get getName(): string {
    return `${this.state.firstName.getValue} ${this.state.lastName.getValue}`;
  }

  get getFirstName(): string {
    return this.state.firstName.getValue;
  }

  get getLastName(): string {
    return this.state.lastName.getValue;
  }

  get getEvents() {
    return this.eventsCollection.get();
  }

  updateFirstName(name: string) {
    const firstName = this.state.firstName.update(name);

    const { value, error } = firstName;

    if (error) {
      return Result.failure(error);
    }

    if (value) {
      this.state.firstName = value;

      this.eventsCollection.add(new LastNameUpdatedEvent(this.id, this.state));
    }
  }

  updateLastName(name: string) {
    const lastName = this.state.lastName.update(name);

    const { value, error } = lastName;

    if (error) {
      return Result.failure(error);
    }

    if (value) {
      this.state.lastName = value;

      this.eventsCollection.add(new FirstNameUpdatedEvent(this.id, this.state));
    }
  }
}
