export class eventList<T extends string, E extends object> {
  private events: { type: T; data: E }[] = [];

  public static create() {
    return new eventList();
  }

  public add(type: T, data: E) {
    this.events.push({ type, data });
  }

  public get() {
    return this.events;
  }
}
