export class Result<T, E> {
  public readonly value?: T;
  public readonly error?: E;

  constructor(value?: T, error?: E) {
    this.value = value;
    this.error = error;
  }
}
