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

interface StudentValidationError {
  type: string;
  errors: Error[];
}

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
  }): Result<Student, StudentValidationError> {
    const firstName = FirstName.create(state.firstName, Validator.validator);

    const lastName = LastName.create(state.lastName, Validator.validator);

    if (firstName.isFailure || lastName.isFailure) {
      const errors = Validator.validate([firstName.error, lastName.error]);

      return Result.fail({
        type: "FAILED_STUDENT_CREATE",
        errors,
      });
    }

    const email = Email.create(
      {
        firstName: firstName.getValue.getValue,
        lastName: lastName.getValue.getValue,
      },
      Validator.validator
    );

    return Result.ok(
      new Student({
        firstName: firstName.getValue,
        lastName: lastName.getValue,
        email: email.getValue,
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

    if (firstName.isFailure) {
      return Result.fail({
        type: "FAILED_FIRSTNAME_UPDATE",
        errors: [firstName.error],
      });
    }

    this.state.firstName = firstName.getValue;

    this.eventsCollection.add(new LastNameUpdatedEvent(this.id, this.state));
  }

  updateLastName(name: string) {
    const lastName = this.state.lastName.update(name);

    if (lastName.isFailure) {
      return Result.fail({
        type: "FAILED_LASTNAME_UPDATE",
        errors: [lastName.error],
      });
    }

    this.state.lastName = lastName.getValue;

    this.eventsCollection.add(new FirstNameUpdatedEvent(this.id, this.state));
  }
}
