import { Email } from "./email";
import { Validator } from "../../shared/validator";

describe("Email", () => {
  describe("Given a email is created", () => {
    it("Then there should be a valid email instance", () => {
      const email = Email.create(
        { firstName: "John", lastName: "Smith" },
        Validator.validator
      ).getValue;
      expect(email).toBeInstanceOf(Email);
    });
  });

  describe("Given a valid first of John, and a valid last of 'Smith' are provided", () => {
    it("Then a email of 'smithjo@essentialist.dev' is retruned", () => {
      const email = Email.create(
        { firstName: "John", lastName: "Smith" },
        Validator.validator
      ).getValue;
      expect(email.getValue).toEqual("smithjo@essentialist.dev");
    });
  });

  describe("Given a invalid email of '' is used", () => {
    it("Then return error", () => {
      const { error } = Email.create(
        { firstName: "", lastName: "" },
        Validator.validator
      );

      expect(error).toEqual({
        message: "Email must match format of [name]@essentialist.dev",
        type: "INVALID_EMAIL",
      });
    });
  });
});
