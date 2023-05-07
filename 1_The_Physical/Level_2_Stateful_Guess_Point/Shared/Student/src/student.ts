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

export class Student {
  constructor(private studentProps: StudentProps) { }

  private static validateNameProps(studentProps: StudentProps): Error[] {
    const errors: Error[] = [];

    type Keys = Extract<keyof StudentProps, string>;

    Object.keys(studentProps).forEach((key) => {
      const value = studentProps[key as Keys];

      if (!value.length && value.length <= 10) {
        const type = ErrorTypeEnum[key as Keys] || `INVALID_VALUE`;

        errors.push({
          type,
          message: `Invalid ${key} value`,
        });
      }
    });

    return errors;
  }

  static create(studentProps: StudentProps): Student | Error[] {
    const errors = Student.validateNameProps(studentProps);
    if (errors.length) return errors;

    return new Student(studentProps);
  }
}
