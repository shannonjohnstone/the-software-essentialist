import { Student } from "./student";

describe("Student", () => {
  describe("Given a valid student is created", () => {
    it("Then a student object is created", () => {
      const studentObject = Student.create({
        firstName: "John",
        lastName: "Smith",
      });

      expect(studentObject).toBeInstanceOf(Student);
    });
  });

  describe("Given a invalid student is created", () => {
    it("Then a error object is created", () => {
      const studentObject = Student.create({ firstName: "", lastName: "" });

      expect(studentObject).toBeInstanceOf(Array);
      expect(studentObject).toEqual([
        { message: "Invalid firstName value", type: "INVALID_FIRSTNAME" },
        { message: "Invalid lastName value", type: "INVALID_LASTNAME" },
      ]);
    });
  });
});
