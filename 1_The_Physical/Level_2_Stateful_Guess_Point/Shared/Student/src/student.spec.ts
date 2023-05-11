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
        firstName: "Kate",
        lastName: "Miller",
      };

      const { student } = Student.create(data);

      expect(student?.name).toEqual(`${data.firstName} ${data.lastName}`);
    });
  });

  describe("Given a invalid student is created", () => {
    it("Then a error object is created", () => {
      const { error } = Student.create({
        firstName: "",
        lastName: "",
      });

      expect(error).toBeInstanceOf(Array);
      expect(error).toEqual([
        {
          message: `Invalid first name value of ""`,
          type: "INVALID_FIRSTNAME",
        },
        { message: `Invalid last name value of ""`, type: "INVALID_LASTNAME" },
        {
          message: `Invalid email email of '@essentialist.dev', using a first name of '' and ''`,
          type: "INVALID_EMAIL",
        },
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
          data: {
            email: "smithjo@essentialist.dev",
            firstName: "John",
            lastName: "Smith",
          },
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

  describe("Given a valid student is created", () => {
    it("Then throw a error when name is updated incorrectly", () => {
      const { student } = Student.create({
        firstName: "John",
        lastName: "Smith",
      });

      expect(() => student?.updateFirstName("")).toThrowError(
        `Invalid first name value of ""`
      );

      expect(() => student?.updateLastName("")).toThrowError(
        `Invalid last name value of ""`
      );
    });
  });
});
