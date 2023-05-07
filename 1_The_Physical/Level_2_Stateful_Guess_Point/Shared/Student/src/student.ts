interface StudentProps {
  firstName: string;
  lastName: string;
}

enum ErrorTypeEnum {
  firstName = "INVALID_FIRSTNAME",
  lastName = "INVALID_LASTNAME",
}

interface Error {
  type: ErrorTypeEnum.firstName | ErrorTypeEnum.lastName;
  message: string;
}

interface Event {
  type: string;
  data: object;
}

const nameValidationConditions = {
  firstName: {
    min: 1,
    max: 10,
  },
  lastName: {
    min: 1,
    max: 15,
  },
};

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
      const value = studentProps[key as Keys];

      const validationConditions = nameValidationConditions[key as Keys];

      if (
        !value ||
        value.length < validationConditions.min ||
        !value ||
        value.length > validationConditions.max
      ) {
        const type = ErrorTypeEnum[key as Keys] || `INVALID_VALUE`;

        errors.push({
          type,
          message: `Invalid ${key} value`,
        });
      }
    });

    return errors;
  }

  static create(studentProps: StudentProps): {
    student?: Student;
    error?: Error[];
  } {
    const error = Student.validateNameProps(studentProps);

    if (error.length) return { error };

    return { student: new Student(studentProps) };
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

  updateFirstName(firstName: string) {
    const validation = Student.validateNameProps({ firstName });
    if (validation.length) {
      throw validation;
    }

    this.studentProps.firstName = firstName;
    this.addEvent("FirstNameUpdated", { firstName });
  }

  updateLastName(lastName: string) {
    const validation = Student.validateNameProps({ lastName });
    if (validation.length) {
      throw validation;
    }

    this.studentProps.lastName = lastName;
    this.addEvent("LastNameUpdated", { lastName });
  }

  private addEvent(type: string, eventProps: Event["data"]) {
    this.events.push({ type, data: eventProps });
  }
}
