import { FirstName } from "./first-name";
import { Validator } from "./validator";

describe("First name", () => {
  describe("Given a first name is created", () => {
    it("Then there should be a valid first name instance", () => {
      const firstName = FirstName.create("John", Validator.validator);
      expect(firstName).toBeInstanceOf(FirstName);
    });
  });

  describe("Given a valid first name of 'John' is created", () => {
    it("Then a value of 'John' is retruned", () => {
      const firstName = FirstName.create("John", Validator.validator);
      expect(firstName.value).toEqual("John");
    });
  });

  describe("Given a invalid first name of '' is used", () => {
    it("Then return error", () => {
      const { error } = FirstName.create("", Validator.validator);

      expect(error).toEqual({
        message: 'Invalid first name value of ""',
        type: "INVALID_FIRSTNAME",
      });
    });
  });
});
