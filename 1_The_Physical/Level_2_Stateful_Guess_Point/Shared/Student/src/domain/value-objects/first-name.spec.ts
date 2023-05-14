import { FirstName } from "./first-name";
import { Validator } from "../../shared/validator";

describe("First name", () => {
  describe("Given a first name is created", () => {
    it("Then there should be a valid first name instance", () => {
      const firstName = FirstName.create("John", Validator.validator);
      expect(firstName.getValue).toBeInstanceOf(FirstName);
    });
  });

  describe("Given a valid first name of 'John' is created", () => {
    it("Then a value of 'John' is retruned", () => {
      const firstName = FirstName.create("John", Validator.validator).getValue;
      expect(firstName.getValue).toEqual("John");
    });
  });

  describe("Given a valid first name of 'Kate' is updated", () => {
    it("Then a value of 'Kate' is retruned", () => {
      const firstName = FirstName.create("John", Validator.validator).getValue;
      expect(firstName.getValue).toEqual("John");

      const updatedFirstName = firstName.update("Kate").getValue;
      expect(updatedFirstName.getValue).toEqual("Kate");
    });
  });

  describe("Given a invalid first name of '' is used", () => {
    it("Then return error", () => {
      const { error } = FirstName.create("", Validator.validator);

      expect(error).toEqual({
        message: "First name muist be between 1 and 10 characters",
        type: "INVALID_FIRSTNAME",
      });
    });
  });
});
