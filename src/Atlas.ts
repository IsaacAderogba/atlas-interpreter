import { Environment } from "./Environment";

export class Atlas {
  constructor(
    private global = new Environment({
      null: null,

      true: true,
      false: false,

      VERSION: "0.1",
    })
  ) {}

  eval(exp, env = this.global) {
    if (this.isNumber(exp)) {
      return exp;
    }

    if (this.isString(exp)) {
      return exp.slice(1, -1);
    }

    if (exp[0] === "+") {
      return this.eval(exp[1], env) + this.eval(exp[2], env);
    }

    if (exp[0] === "*") {
      return this.eval(exp[1], env) * this.eval(exp[2], env);
    }

    if (exp[0] === "/") {
      return this.eval(exp[1], env) / this.eval(exp[2], env);
    }

    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value));
    }

    if (this.isVariableName(exp)) {
      return env.lookup(exp);
    }

    throw `Unimplemented ${JSON.stringify(exp)}`;
  }

  private isNumber(exp) {
    return typeof exp === "number";
  }

  private isString(exp) {
    return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
  }

  private isVariableName(exp) {
    return (
      typeof exp === "string" &&
      (/^[+\-*/<>=-zA-Z][a-zA-Z0-9_]*$/.test(exp) || ["<=", ">="].includes(exp))
    );
  }
}
