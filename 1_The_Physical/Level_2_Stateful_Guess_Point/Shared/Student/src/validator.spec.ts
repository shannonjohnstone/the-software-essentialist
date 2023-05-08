import { Validator } from "./validator";

describe("Validator", () => {
  describe("Given the validate is ran with invalidate values", () => {
    it("Then return validation errors", () => {
      class ValidatorMock1 {
        get error() {
          return {
            type: "INVALID_MOCK_ONE",
            message: "Invalid mock one",
          };
        }
      }

      const mock1 = new ValidatorMock1();
      const validator = Validator.validate([mock1.error]);

      expect(validator).toEqual([
        {
          type: "INVALID_MOCK_ONE",
          message: "Invalid mock one",
        },
      ]);
    });
  });

  describe("Given the validator is ran with '' and '/^[a-z]{1,10}$/i", () => {
    it("Then a false result", () => {
      const validator = Validator.validator({
        value: "",
        pattern: /^[a-z]{1,10}$/i,
      });

      expect(validator).toEqual(false);
    });
  });

  describe("Given the validator is ran with 'John' and '/^[a-z]{1,10}$/i", () => {
    it("Then a true result", () => {
      const validator = Validator.validator({
        value: "John",
        pattern: /^[a-z]{1,10}$/i,
      });

      expect(validator).toEqual(true);
    });
  });
});
