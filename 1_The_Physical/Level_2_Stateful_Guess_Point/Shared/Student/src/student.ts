interface StudentProps {
  firstName: string;
  lastName: string;
}

export class Student {
  constructor(private studentProps: StudentProps) { }

  static create(studentProps: StudentProps) {
    return new Student(studentProps);
  }
}
