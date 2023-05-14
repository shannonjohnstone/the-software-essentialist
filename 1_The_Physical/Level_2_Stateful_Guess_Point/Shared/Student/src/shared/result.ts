export class Result<T, E> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  private _value?: T;
  public readonly error?: E;

  constructor(isSuccess: boolean, error?: E, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        "Invalid operation: result cannont be successfull and contain an error"
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        "Invalid operation: result cannont be unsuccessfull and not contain an error"
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    this._value = value;

    this.error = error;
  }

  get getValue(): T {
    if (!this.isSuccess || !this._value) {
      throw new Error("Cant retrieve the value from a failed result.");
    }

    return this._value;
  }
  static ok<T>(value: T): Result<T, never> {
    return new Result<T, never>(true, undefined, value);
  }

  static fail<E>(error: E): Result<never, E> {
    return new Result(false, error);
  }
}
