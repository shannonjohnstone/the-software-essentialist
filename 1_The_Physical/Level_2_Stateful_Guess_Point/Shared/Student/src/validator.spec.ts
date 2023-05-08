import { Validator } from "./validator";

describe("Validator", () => {
  describe("Given a validator is created", () => {
    it("Then returns a validator instance", () => {
      const validator = Validator.create();
      expect(validator).toBeInstanceOf(Validator);
    });
  });
});
