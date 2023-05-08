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

export class LastName implements Entity<Name> {
  private pattern = /^[a-z]{1,15}$/gi;

  constructor(private name: Name, private validator: Validator) { }

  static create(name: Name, validator: Validator): LastName {
    return new LastName(name, validator);
  }

  get error() {
    const { validator, name, pattern } = this;

    const isInvalid = !validator({ value: name, pattern });

    if (isInvalid) {
      return {
        type: "INVALID_LASTNAME",
        message: `Invalid last name value of "${name}"`,
      };
    }
  }

  get value() {
    return this.name;
  }
}
