export class Environment {
  constructor(
    private record: { [key: string]: any } = {},
    private parent: Environment | null = null
  ) {}

  define(name: string, value) {
    this.record[name] = value;
    return value;
  }

  lookup(name: string) {
    return this.resolve(name).record[name];
  }

  assign(name: string, value) {
    this.resolve(name).record[name] = value;
  }

  private resolve(name): Environment {
    if (this.record.hasOwnProperty(name)) {
      return this;
    }

    if (this.parent === null) {
      throw new ReferenceError(`Variable "${name}" is not defined.`);
    }

    return this.parent.resolve(name);
  }
}
