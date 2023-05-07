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
  constructor(private studentProps: StudentProps) { }

  private static validateNameProps(studentProps: StudentProps): Error[] {
    const errors: Error[] = [];

    type Keys = Extract<keyof StudentProps, string>;

    Object.keys(studentProps).forEach((key) => {
      const value = studentProps[key as Keys];

      const validationConditions = nameValidationConditions[key as Keys];

      if (
        value.length < validationConditions.min ||
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

  static create(studentProps: StudentProps): Student | Error[] {
    const errors = Student.validateNameProps(studentProps);
    if (errors.length) return errors;

    return new Student(studentProps);
  }
}
