export interface ValidationError {
  type: string;
  message: string;
}

export interface ValidatorProps {
  value: string;
  pattern: RegExp;
}

type ValidatorItem = ValidationError;

export class Validator {
  static validate(items: (ValidatorItem | undefined)[]): ValidationError[] {
    return items
      ?.map((validator) => validator)
      .filter(Boolean) as ValidationError[];
  }

  static validator({ value = "", pattern }: ValidatorProps) {
    const regex = new RegExp(pattern);
    return regex.test(value);
  }
}
