import { Student } from "./student";

describe("Student", () => {
  describe("Given a student is created", () => {
    it("Then a studen object is created", () => {
      const studentObject = Student.create({
        firstName: "John",
        lastName: "Smith",
      });

      expect(studentObject).toBeInstanceOf(Student);
    });
  });
});
