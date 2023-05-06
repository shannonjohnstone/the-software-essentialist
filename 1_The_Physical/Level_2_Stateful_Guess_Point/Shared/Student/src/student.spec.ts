import { Student } from "./student";

describe("Student", () => {
  describe("Given a student is initialised", () => {
    it("Then a studen object is created", () => {
      const studentObject = new Student();

      expect(studentObject).toBeInstanceOf(Student)
    })
  })
})