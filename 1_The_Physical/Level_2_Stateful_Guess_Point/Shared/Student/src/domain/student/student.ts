import { v4 as uuid } from "uuid";
import { Email } from "../value-objects/email";
import { FirstName } from "../value-objects/first-name";
import { LastName } from "../value-objects/last-name";
import { Validator } from "../../shared/validator";
import { Result } from "../../shared/result";
import { AggregateRoot } from "../aggregate-root";
import { DomainEvent } from "../domain-events";

interface StudentState {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
}

// enum ErrorTypeEnum {
//   firstName = "INVALID_FIRSTNAME",
//   lastName = "INVALID_LASTNAME",
//   email = "INVALID_EMAIL",
// }

interface Error {
  // type: ErrorTypeEnum.firstName | ErrorTypeEnum.lastName | ErrorTypeEnum.email;
  type: string;
  message: string;
}

class StudentError extends Error {
  readonly validations: Error[] = [];

  constructor(public message: string, public validaitons: Error[]) {
    super(message);
  }
}

export class Student implements AggregateRoot<StudentState> {
  public readonly id: string;
  public readonly state: StudentState;
  public readonly eventsCollection: DomainEvent[] = [];

  constructor(state: StudentState) {
    this.state = state;
    this.id = uuid();

    this.addEvent("StudentCreated", {
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      email: this.state.email.value,
    });
  }

  static create(state: {
    firstName: string;
    lastName: string;
  }): Result<Student, Error[]> {
    const firstName = FirstName.create(state.firstName, Validator.validator);

    const lastName = LastName.create(state.lastName, Validator.validator);

    const email = Email.create(
      {
        firstName: firstName.value?.value || "",
        lastName: lastName.value?.value || "",
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

  get name(): string {
    return `${this.state.firstName.value} ${this.state.lastName.value}`;
  }

  get firstName(): string {
    return this.state.firstName.value;
  }

  get lastName(): string {
    return this.state.lastName.value;
  }

  get events(): DomainEvent[] {
    return this.eventsCollection;
  }

  updateFirstName(name: string) {
    const firstName = this.state.firstName.update(name);

    const {
      value,
      error = {
        type: "INVALID_FIRST_NAME_UPDATE",
        message: "Invalid first name update",
      },
    } = firstName;

    if (value) {
      this.state.firstName = value;
      this.addEvent("FirstNameUpdated", { firstName: value });
    } else {
      throw new StudentError(error.message, [error]);
    }
  }

  updateLastName(name: string) {
    const lastName = this.state.lastName.update(name);

    const {
      value,
      error = {
        type: "INVALID_LAST_NAME_UPDATE",
        message: "Invalid last name update",
      },
    } = lastName;

    if (value) {
      this.state.lastName = value;
      this.addEvent("LastNameUpdated", { lastName: value });
    } else {
      throw new StudentError(error?.message, [error]);
    }
  }

  private addEvent(type: string, eventProps: DomainEvent["data"]) {
    this.eventsCollection.push({ type, data: eventProps });
  }
}
