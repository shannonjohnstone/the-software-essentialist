import { Email } from "../value-objects/email";
import { FirstName } from "../value-objects/first-name";
import { LastName } from "../value-objects/last-name";
import { Validator } from "../../shared/validator";
import { Result } from "../../shared/result";

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

  static create(studentProps: {
    firstName: string;
    lastName: string;
  }): Result<Student, Error[]> {
    const firstName = FirstName.create(
      studentProps.firstName,
      Validator.validator
    );

    const lastName = LastName.create(
      studentProps.lastName,
      Validator.validator
    );

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

    const {
      value,
      error = {
        type: "INVALID_FIRST_NAME_UPDATE",
        message: "Invalid first name update",
      },
    } = firstName;

    if (value) {
      this.studentProps.firstName = value;
      this.addEvent("FirstNameUpdated", { firstName: value });
    } else {
      throw new StudentError(error.message, [error]);
    }
  }

  updateLastName(name: string) {
    const lastName = this.studentProps.lastName.update(name);

    const {
      value,
      error = {
        type: "INVALID_LAST_NAME_UPDATE",
        message: "Invalid last name update",
      },
    } = lastName;

    if (value) {
      this.studentProps.lastName = value;
      this.addEvent("LastNameUpdated", { lastName: value });
    } else {
      throw new StudentError(error?.message, [error]);
    }
  }

  private addEvent(type: string, eventProps: Event["data"]) {
    this.events.push({ type, data: eventProps });
  }
}
