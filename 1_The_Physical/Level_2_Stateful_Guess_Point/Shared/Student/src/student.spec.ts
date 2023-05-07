import { Student } from "./student";

describe("Student", () => {
  describe("Given a student is created", () => {
    it("Then a studen object is created", () => {
      const studentObject = Student.create();

      expect(studentObject).toBeInstanceOf(Student)
    })
  })
})