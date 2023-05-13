export class eventList<T extends string, E> {
  private events: { type: T; data: E }[] = [];

  public static create() {
    return new eventList();
  }

  public add(eventProps: { type: T; data: E }) {
    this.events.push(eventProps);
  }

  public get() {
    return this.events;
  }
}
