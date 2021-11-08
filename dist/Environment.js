"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalEnvironment = exports.Environment = void 0;
class Environment {
    constructor(record = {}, parent = null) {
        this.record = record;
        this.parent = parent;
    }
    define(name, value) {
        this.record[name] = value;
        return value;
    }
    lookup(name) {
        return this.resolve(name).record[name];
    }
    assign(name, value) {
        this.resolve(name).record[name] = value;
    }
    resolve(name) {
        if (this.record.hasOwnProperty(name)) {
            return this;
        }
        if (this.parent === null) {
            throw new ReferenceError(`Variable "${name}" is not defined.`);
        }
        return this.parent.resolve(name);
    }
}
exports.Environment = Environment;
exports.GlobalEnvironment = new Environment({
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
