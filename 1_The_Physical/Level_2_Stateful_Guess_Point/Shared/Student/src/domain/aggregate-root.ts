export interface AggregateRoot<T, E> {
  readonly id: string;
  readonly state: T;
  readonly eventsCollection: E;
}
