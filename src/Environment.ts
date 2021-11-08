export class Environment {
  constructor(private record: { [key: string]: any } = {}) {}

  define(name: string, value) {
    this.record[name] = value;
    return value;
  }

  lookup(name: string) {
    if (!this.record.hasOwnProperty(name)) {
      throw new ReferenceError(`Variable "${name}" is not defined.`)
    }
    return this.record[name];
  }
}
