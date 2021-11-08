import { Environment, GlobalEnvironment } from "./Environment";
import parser from "./parser/parser";

export class Atlas {
  constructor(private global = GlobalEnvironment) {}

  run(code: string) {
    const exp = parser.parse(`(begin ${code})`);
    return this.eval(exp);
  }

  // evalGlobal(exp, env = this.global) {
  //   return this._evalBody(exp, env);
  // }

  eval(exp, env = this.global) {
    if (this.isNumber(exp)) {
      return exp;
    }

    if (this.isString(exp)) {
      return exp.slice(1, -1);
    }

    if (exp[0] === "begin") {
      const blockEnv = new Environment({}, env);
      return this.evalBlock(exp, blockEnv);
    }

    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value, env));
    }

    if (exp[0] === "set") {
      const [_, name, value] = exp;
      return env.assign(name, this.eval(value, env));
    }

    if (this.isVariableName(exp)) {
      return env.lookup(exp);
    }

    if (exp[0] === "if") {
      const [_tag, condition, consequent, alternate] = exp;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }
      return this.eval(alternate, env);
    }

    if (exp[0] === "while") {
      const [_tag, condition, body] = exp;

      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }
      return result;
    }

    if (Array.isArray(exp)) {
      const fn = this.eval(exp[0], env);

      const args = exp.slice(1).map((arg) => this.eval(arg, env));

      if (typeof fn === "function") {
        return fn(...args);
      }
    }

    throw `Unimplemented ${JSON.stringify(exp)}`;
  }

  private evalBlock(block, env: Environment) {
    let result;

    const [_tag, ...expressions] = block;

    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });

    return result;
  }

  private isNumber(exp) {
    return typeof exp === "number";
  }

  private isString(exp) {
    return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
  }

  private isVariableName(exp) {
    return (
      (typeof exp === "string" && /^[+\-*/<>=-zA-Z][a-zA-Z0-9_]*$/.test(exp)) ||
      ["<=", ">="].includes(exp)
    );
  }
}
