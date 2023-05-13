import { Email } from "./email";
import { Validator } from "../../shared/validator";

describe("Email", () => {
  describe("Given a email is created", () => {
    it("Then there should be a valid email instance", () => {
      const email = Email.create(
        { firstName: "John", lastName: "Smith" },
        Validator.validator
      );
      expect(email.value).toBeInstanceOf(Email);
    });
  });

  describe("Given a valid first of John, and a valid last of 'Smith' are provided", () => {
    it("Then a email of 'smithjo@essentialist.dev' is retruned", () => {
      const email = Email.create(
        { firstName: "John", lastName: "Smith" },
        Validator.validator
      );
      expect(email.value?.getValue).toEqual("smithjo@essentialist.dev");
    });
  });

  describe("Given a invalid email of '' is used", () => {
    it("Then return error", () => {
      const { error } = Email.create(
        { firstName: "", lastName: "" },
        Validator.validator
      );

      expect(error).toEqual({
        message:
          "Invalid email email of '@essentialist.dev', using a first name of '' and ''",
        type: "INVALID_EMAIL",
      });
    });
  });
});
