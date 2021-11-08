export class Atlas {
  eval(exp) {
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }

    if (exp[0] === "+") {
      return this.eval(exp[1]) + this.eval(exp[2]);
    }

    if (exp[0] === "*") {
      return this.eval(exp[1]) * this.eval(exp[2]);
    }

    if (exp[0] === "/") {
      return this.eval(exp[1]) / this.eval(exp[2]);
    }

    throw "Unimplemented";
  }
}

function isNumber(exp) {
  return typeof exp === "number";
}

function isString(exp) {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}

const atlas = new Atlas();

console.log(atlas.eval('"Hello"'));
