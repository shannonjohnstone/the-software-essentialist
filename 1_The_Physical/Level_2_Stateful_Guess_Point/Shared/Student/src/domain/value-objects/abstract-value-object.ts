import { ValidationError } from "../../shared/validator";

interface ValueObject<T, E> {
  getValue: T;
  error?: E;
}

export type Validator = ({
  value,
  pattern,
}: {
  value: string;
  pattern: RegExp;
}) => boolean;

export abstract class AbstractValueObject<
  I extends string,
  E extends ValidationError = ValidationError
> implements ValueObject<I, E>
{
  constructor(
    private value: I,
    public validator: Validator,
    readonly pattern: RegExp,
    readonly errorObject: E
  ) { }

  get error() {
    const { validator, value, pattern, errorObject } = this;

    const isInvalid = !validator({ value, pattern });

    if (isInvalid) {
      return errorObject;
    }
  }

  get getValue() {
    return this.value;
  }
}
