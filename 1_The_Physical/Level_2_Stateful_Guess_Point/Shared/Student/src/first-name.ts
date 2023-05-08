export class FirstName {
  constructor(private name: string) { }

  static create(name: string): FirstName {
    return new FirstName(name);
  }
}
