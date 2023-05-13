export interface ValueObject<T, E> {
  getValue: T;
  error?: E;
}
