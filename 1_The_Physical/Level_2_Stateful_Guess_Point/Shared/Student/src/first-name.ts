import { ValidationError } from "./validator";

type Name = string;

interface Entity<Props> {
  value: Props;
  error?: ValidationError | void;
}

type Validator = ({
  value,
  pattern,
}: {
  value: string;
  pattern: RegExp;
}) => boolean;

export class FirstName implements Entity<Name> {
  private pattern = /^[a-z]{1,10}$/i;

  constructor(private name: Name, private validator: Validator) { }

  static create(name: Name, validator: Validator): FirstName {
    return new FirstName(name, validator);
  }

  update(name: Name) {
    return new FirstName(name, this.validator);
  }

  get error() {
    const { validator, name, pattern } = this;

    const isInvalid = !validator({ value: name, pattern });

    if (isInvalid) {
      return {
        type: "INVALID_FIRSTNAME",
        message: `Invalid first name value of "${name}"`,
      };
    }
  }

  get value() {
    return this.name;
  }
}
