interface StudentProps {
  firstName: string;
  lastName: string;
  email: string;
}

enum ErrorTypeEnum {
  firstName = "INVALID_FIRSTNAME",
  lastName = "INVALID_LASTNAME",
  email = "INVALID_EMAIL",
}

interface Error {
  type: ErrorTypeEnum.firstName | ErrorTypeEnum.lastName | ErrorTypeEnum.email;
  message: string;
}

interface Event {
  type: string;
  data: object;
}

const nameValidationConditions = {
  firstName: {
    pattern: /^[a-z]{0,10}$/i,
  },
  lastName: {
    pattern: /^[a-z]{0,15}$/i,
  },
  email: {
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
  },
};

class StudentError extends Error {
  readonly validations: unknown[] = [];

  constructor(public message: string, public validaitons: Error[]) {
    super(message);
  }
}

export class Student {
  private eventsCollection: Event[] = [];

  constructor(private studentProps: StudentProps) {
    this.addEvent("StudentCreated", this.studentProps);
  }

  private static validateNameProps(
    studentProps: Partial<StudentProps>
  ): Error[] {
    const errors: Error[] = [];

    type Keys = Extract<keyof StudentProps, string>;

    Object.keys(studentProps).forEach((key) => {
      const value = studentProps[key as Keys] || "";

      const validationConditions = nameValidationConditions[key as Keys];

      const regex = new RegExp(validationConditions.pattern);
      const isInvalid = !value || !regex.test(value);

      if (isInvalid) {
        const type = ErrorTypeEnum[key as Keys] || `INVALID_VALUE`;

        errors.push({
          type,
          message: `Invalid ${key} value`,
        });
      }
    });

    return errors;
  }

  static create(studentProps: { firstName: string; lastName: string }): {
    student?: Student;
    error?: Error[];
  } {
    const email = Student.generateEmail(studentProps);

    const error = Student.validateNameProps({ ...studentProps, email });

    if (error.length) return { error };

    return { student: new Student({ ...studentProps, email }) };
  }

  get name(): string {
    return `${this.studentProps.firstName} ${this.studentProps.lastName}`;
  }

  get firstName(): string {
    return this.studentProps.firstName;
  }

  get lastName(): string {
    return this.studentProps.lastName;
  }

  get events(): Event[] {
    return this.eventsCollection;
  }

  static generateEmail({
    firstName = "",
    lastName = "",
  }: {
    firstName: string;
    lastName: string;
  }): string {
    const last = lastName.slice(0, 5);
    const first = firstName.slice(0, 2);

    return `${last}${first}@essentialist.dev`;
  }

  updateFirstName(firstName: string) {
    const validation = Student.validateNameProps({ firstName });

    if (validation.length) {
      throw new StudentError(validation[0].message, validation);
    }

    this.studentProps.firstName = firstName;
    this.addEvent("FirstNameUpdated", { firstName });
  }

  updateLastName(lastName: string) {
    const validation = Student.validateNameProps({ lastName });

    if (validation.length) {
      throw new StudentError(validation[0].message, validation);
    }

    this.studentProps.lastName = lastName;
    this.addEvent("LastNameUpdated", { lastName });
  }

  private addEvent(type: string, eventProps: Event["data"]) {
    this.events.push({ type, data: eventProps });
  }
}
