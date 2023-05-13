import { LastName } from "./last-name";
import { Validator } from "../../shared/validator";

describe("Last name", () => {
  describe("Given a last name is created", () => {
    it("Then there should be a valid last name instance", () => {
      const lastName = LastName.create("Smith", Validator.validator);
      expect(lastName.value).toBeInstanceOf(LastName);
    });
  });

  describe("Given a valid last name of 'Smith' is created", () => {
    it("Then a value of 'Smith' is retruned", () => {
      const lastName = LastName.create("Smith", Validator.validator);
      expect(lastName.error).toBeFalsy();
      expect(lastName.value?.getValue).toEqual("Smith");
    });
  });

  describe("Given a valid last name of 'Hart' is updated", () => {
    it("Then a value of 'Smith' is retruned", () => {
      const lastName = LastName.create("Smith", Validator.validator);
      expect(lastName.value?.getValue).toEqual("Smith");

      const updatedLastName = lastName.value?.update("Hart");
      expect(updatedLastName?.value?.getValue).toEqual("Hart");
    });
  });

  describe("Given a invalid last name of '' is used", () => {
    it("Then return error", () => {
      const { error } = LastName.create("", Validator.validator);

      expect(error).toEqual({
        message: 'Invalid last name value of ""',
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
        message:
          'Invalid last name value of "aVeryLongLastNameThatIsOverCharacterLimit"',
        type: "INVALID_LASTNAME",
      });
    });
  });
});
