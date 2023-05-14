import { LastName } from "./last-name";
import { Validator } from "../../shared/validator";

describe("Last name", () => {
  describe("Given a last name is created", () => {
    it("Then there should be a valid last name instance", () => {
      const lastName = LastName.create("Smith", Validator.validator).getValue;
      expect(lastName).toBeInstanceOf(LastName);
    });
  });

  describe("Given a valid last name of 'Smith' is created", () => {
    it("Then a value of 'Smith' is retruned", () => {
      const lastName = LastName.create("Smith", Validator.validator).getValue;
      expect(lastName.error).toBeFalsy();
      expect(lastName.getValue).toEqual("Smith");
    });
  });

  describe("Given a valid last name of 'Hart' is updated", () => {
    it("Then a value of 'Smith' is retruned", () => {
      const lastName = LastName.create("Smith", Validator.validator).getValue;
      expect(lastName.getValue).toEqual("Smith");

      const updatedLastName = lastName.update("Hart").getValue;
      expect(updatedLastName.getValue).toEqual("Hart");
    });
  });

  describe("Given a invalid last name of '' is used", () => {
    it("Then return error", () => {
      const { error } = LastName.create("", Validator.validator);

      expect(error).toEqual({
        message: "Last name must be between 2 and 15 characters",
        type: "INVALID_LASTNAME",
      });
    });
  });

  describe("Given a invalid last name of 'aVeryLongLastNameThatIsOverCharacterLimit' is used", () => {
    it("Then return error", () => {
      const { error } = LastName.create(
        "aVeryLongLastNameThatIsOverCharacterLimit",
        Validator.validator
      );

      expect(error).toEqual({
        message: "Last name must be between 2 and 15 characters",
        type: "INVALID_LASTNAME",
      });
    });
  });
});
