import { Result } from "../../shared/result";
import { ValidationError } from "../../shared/validator";
import { AbstractValueObject, Validator } from "./abstract-value-object";

type Name = string;

export class FirstName extends AbstractValueObject<Name> {
  static readonly pattern = /^[a-z]{1,10}$/i;

  static readonly errorObject = {
    type: "INVALID_FIRSTNAME",
    message: `First name muist be between 1 and 10 characters`,
  };

  public static create(
    name: Name,
    validator: Validator
  ): Result<FirstName, ValidationError> {
    const firstName = new FirstName(
      name,
      validator,
      this.pattern,
      this.errorObject
    );

    if (firstName.error) return Result.fail(firstName.error);

    return Result.ok(firstName);
  }

  public update(name: Name) {
    return FirstName.create(name, this.validator);
  }
}
