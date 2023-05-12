import { DomainEvent } from "./domain-events";

export interface AggregateRoot<T> {
  readonly id: string;
  readonly state: T;
  readonly eventsCollection: DomainEvent[];
}
