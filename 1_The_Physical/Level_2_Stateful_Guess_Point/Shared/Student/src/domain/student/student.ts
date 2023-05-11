import { Email } from "../value-objects/email";
import { FirstName } from "../value-objects/first-name";
import { LastName } from "../value-objects/last-name";
import { Validator } from "../../shared/validator";

interface StudentProps {
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

interface Event {
  type: string;
  data: object;
}

class StudentError extends Error {
  readonly validations: unknown[] = [];

  constructor(public message: string, public validaitons: Error[]) {
    super(message);
  }
}

export class Student {
  private eventsCollection: Event[] = [];

  constructor(private studentProps: StudentProps) {
    this.addEvent("StudentCreated", {
      firstName: this.studentProps.firstName.value,
      lastName: this.studentProps.lastName.value,
      email: this.studentProps.email.value,
    });
  }

  static create(studentProps: { firstName: string; lastName: string }): {
    student?: Student;
    error?: Error[];
  } {
    const firstName = FirstName.create(
      studentProps.firstName,
      Validator.validator
    );

    const lastName = LastName.create(
      studentProps.lastName,
      Validator.validator
    );

    const email = Email.create(
      { firstName: firstName.value, lastName: lastName.value },
      Validator.validator
    );

    const error = Validator.validate([
      firstName.error,
      lastName.error,
      email.error,
    ]);

    if (error.length) return { error };

    return {
      student: new Student({
        firstName,
        lastName,
        email,
      }),
    };
  }

  get name(): string {
    return `${this.studentProps.firstName.value} ${this.studentProps.lastName.value}`;
  }

  get firstName(): string {
    return this.studentProps.firstName.value;
  }

  get lastName(): string {
    return this.studentProps.lastName.value;
  }

  get events(): Event[] {
    return this.eventsCollection;
  }

  updateFirstName(name: string) {
    const firstName = this.studentProps.firstName.update(name);

    const { value, error } = firstName;
    if (error) {
      throw new StudentError(error.message, [error]);
    }

    this.studentProps.firstName = firstName;
    this.addEvent("FirstNameUpdated", { firstName: value });
  }

  updateLastName(name: string) {
    const lastName = this.studentProps.lastName.update(name);

    const { value, error } = lastName;
    if (error) {
      throw new StudentError(error.message, [error]);
    }

    this.studentProps.lastName = lastName;
    this.addEvent("LastNameUpdated", { lastName: value });
  }

  private addEvent(type: string, eventProps: Event["data"]) {
    this.events.push({ type, data: eventProps });
  }
}
