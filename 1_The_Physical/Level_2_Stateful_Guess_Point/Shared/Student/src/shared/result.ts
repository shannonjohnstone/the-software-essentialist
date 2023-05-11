export class Result<T, E> {
  public readonly value?: T;
  public readonly error?: E;

  constructor(value?: T, error?: E) {
    this.value = value;
    this.error = error;
  }

  static success<T, E>(value: T): Result<T, E> {
    return new Result(value);
  }

  static failure<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(undefined, error);
  }
}
