import { Result } from "../../shared/result";
import { ValidationError } from "../../shared/validator";

type Name = string;

type FirstNameError = ValidationError | undefined;

interface Entity<Props> {
  value: Props;
  error?: FirstNameError;
}

type Validator = ({
  value,
  pattern,
}: {
  value: string;
  pattern: RegExp;
}) => boolean;

export class FirstName implements Entity<Name> {
  static readonly pattern = /^[a-z]{1,10}$/i;

  constructor(private name: Name, private validator: Validator) { }

  public static create(
    name: Name,
    validator: Validator
  ): Result<FirstName, FirstNameError> {
    const firstName = new FirstName(name, validator);

    if (firstName.error) return Result.failure(firstName.error);

    return Result.success(firstName);
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
        message: `Invalid first name value of "${name}"`,
      };
    }
  }

  public get value() {
    return this.name;
  }
}
