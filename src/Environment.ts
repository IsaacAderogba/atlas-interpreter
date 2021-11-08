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

export const GlobalEnvironment = new Environment({
  null: null,
  true: true,
  false: false,
  VERSION: "0.1",
  // all operands should be eval'd by the time we get here
  "+"(op1, op2) {
    return op1 + op2;
  },
  "-"(op1, op2 = null) {
    if (op2 == null) {
      return -op1;
    }
    return op1 - op2;
  },
  "*"(op1, op2) {
    return op1 * op2;
  },
  "/"(op1, op2) {
    return op1 / op2;
  },
  ">"(op1, op2) {
    return op1 > op2;
  },
  ">="(op1, op2) {
    return op1 >= op2;
  },
  "<"(op1, op2) {
    return op1 < op2;
  },
  "<="(op1, op2) {
    return op1 <= op2;
  },
  "="(op1, op2) {
    return op1 === op2;
  },
  print(...args) {
    console.log(...args);
  }
});
