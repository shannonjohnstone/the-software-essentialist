import { Student } from "./student";

describe("Student", () => {
  describe("Given a valid student is created", () => {
    it("Then a student object is created", () => {
      const data = {
        firstName: "John",
        lastName: "Smith",
      };

      const { student } = Student.create(data);
      expect(student).toBeInstanceOf(Student);
    });
  });

  describe("Given a valid student is created", () => {
    it("Then retrieve a students name", () => {
      const data = {
        firstName: "John",
        lastName: "Smith",
      };

      const { student } = Student.create(data);
      expect(student?.name).toEqual(`${data.firstName} ${data.lastName}`);
    });
  });

  describe("Given a invalid student is created", () => {
    it("Then a error object is created", () => {
      const { error } = Student.create({ firstName: "", lastName: "" });

      expect(error).toBeInstanceOf(Array);
      expect(error).toEqual([
        { message: "Invalid firstName value", type: "INVALID_FIRSTNAME" },
        { message: "Invalid lastName value", type: "INVALID_LASTNAME" },
      ]);
    });
  });

  describe("Given a valid student is created", () => {
    it("Then a event of StudentCreated should be created", () => {
      const { student } = Student.create({
        firstName: "John",
        lastName: "Smith",
      });

      expect(student?.events).toEqual([
        {
          data: { firstName: "John", lastName: "Smith" },
          type: "StudentCreated",
        },
      ]);
    });
  });

  describe("Given a valid student is created", () => {
    it("Then update first and last name", () => {
      const { student } = Student.create({
        firstName: "John",
        lastName: "Smith",
      });

      expect(student?.firstName).toEqual("John");
      expect(student?.lastName).toEqual("Smith");

      student?.updateFirstName("Ken");
      student?.updateLastName("Ward");

      expect(student?.firstName).toEqual("Ken");
      expect(student?.lastName).toEqual("Ward");
    });
  });
});
