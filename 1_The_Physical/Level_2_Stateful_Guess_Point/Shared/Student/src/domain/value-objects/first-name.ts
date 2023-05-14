import { Result } from "../../shared/result";
import { ValidationError } from "../../shared/validator";
import { ValueObject } from "./value-object";

type Name = string;

type FirstNameError = ValidationError | undefined;

type Validator = ({
  value,
  pattern,
}: {
  value: string;
  pattern: RegExp;
}) => boolean;

export class FirstName implements ValueObject<Name, FirstNameError> {
  static readonly pattern = /^[a-z]{1,10}$/i;

  constructor(private name: Name, private validator: Validator) { }

  public static create(
    name: Name,
    validator: Validator
  ): Result<FirstName, FirstNameError> {
    const firstName = new FirstName(name, validator);

    if (firstName.error) return Result.fail(firstName.error);

    return Result.ok(firstName);
  }

  public update(name: Name) {
    return FirstName.create(name, this.validator);
  }

  public get error() {
    const { validator, name } = this;

    const isInvalid = !validator({ value: name, pattern: FirstName.pattern });

    if (isInvalid) {
      return {
        type: "INVALID_FIRSTNAME",
        message: `First name muist be between 1 and 10 characters`,
      };
    }
  }

  public get getValue() {
    return this.name;
  }
}
