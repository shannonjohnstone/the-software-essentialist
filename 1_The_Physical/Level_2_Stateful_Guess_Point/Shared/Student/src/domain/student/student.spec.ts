import { Student } from "./student";
jest.mock("uuid", () => ({ v4: () => "123456789" }));

describe("Student", () => {
  describe("Given a valid student is created", () => {
    it("Then a student object is created", () => {
      const data = {
        firstName: "John",
        lastName: "Smith",
      };

      const student = Student.create(data);
      expect(student.getValue).toBeInstanceOf(Student);
    });
  });

  describe("Given a valid student is created", () => {
    it("Then retrieve a students name", () => {
      const data = {
        firstName: "Kate",
        lastName: "Miller",
      };

      const student = Student.create(data);

      expect(student.getValue.getName).toEqual(
        `${data.firstName} ${data.lastName}`
      );
    });
  });

  describe("Given a invalid student is created", () => {
    it("Then a error object is created", () => {
      const { error } = Student.create({
        firstName: "",
        lastName: "",
      });

      expect(error).toEqual({
        type: "FAILED_STUDENT_CREATE",
        errors: [
          {
            message: "First name muist be between 1 and 10 characters",
            type: "INVALID_FIRSTNAME",
          },
          {
            message: "Last name must be between 2 and 15 characters",
            type: "INVALID_LASTNAME",
          },
        ],
      });
    });
  });

  describe("Given a valid student is created", () => {
    it("Then a event of StudentCreated should be created", () => {
      const student = Student.create({
        firstName: "John",
        lastName: "Smith",
      });

      expect(student.getValue.getEvents).toEqual([
        {
          data: {
            email: "smithjo@essentialist.dev",
            firstName: "John",
            id: "123456789",
            lastName: "Smith",
          },
          type: "StudentCreated",
        },
      ]);
    });
  });

  describe("Given a valid student is created", () => {
    it("Then update first and last name", () => {
      const student = Student.create({
        firstName: "John",
        lastName: "Smith",
      });

      expect(student.getValue.getFirstName).toEqual("John");
      expect(student.getValue.getLastName).toEqual("Smith");

      student.getValue.updateFirstName("Ken");
      student.getValue.updateLastName("Ward");

      expect(student.getValue.getFirstName).toEqual("Ken");
      expect(student.getValue.getLastName).toEqual("Ward");
    });
  });

  describe("Given a valid student is created", () => {
    it("Then throw a error when name is updated incorrectly", () => {
      const student = Student.create({
        firstName: "John",
        lastName: "Smith",
      });

      const updatedFirstName = student.getValue.updateFirstName("");

      expect(updatedFirstName?.error).toEqual({
        type: "FAILED_FIRSTNAME_UPDATE",
        errors: [
          {
            message: "First name muist be between 1 and 10 characters",
            type: "INVALID_FIRSTNAME",
          },
        ],
      });

      const updatedLastName = student.getValue.updateLastName("");

      expect(updatedLastName?.error).toEqual({
        type: "FAILED_LASTNAME_UPDATE",
        errors: [
          {
            message: "Last name must be between 2 and 15 characters",
            type: "INVALID_LASTNAME",
          },
        ],
      });
    });
  });
});
