type Name = string;
export class FirstName {
  constructor(private name: Name) { }

  static create(name: Name): FirstName {
    return new FirstName(name);
  }

  get value(): Name {
    return this.name;
  }
}
