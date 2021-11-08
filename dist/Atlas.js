"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atlas = void 0;
const fs_1 = __importDefault(require("fs"));
const Environment_1 = require("./Environment");
const parser_1 = __importDefault(require("./parser/parser"));
const Transformer_1 = require("./transform/Transformer");
class Atlas {
    constructor(global = Environment_1.GlobalEnvironment, transformer = new Transformer_1.Transformer()) {
        this.global = global;
        this.transformer = transformer;
    }
    run(code) {
        const exp = parser_1.default.parse(`(begin ${code})`);
        return this.evalGlobal(exp);
    }
    evalGlobal(exp, env = this.global) {
        return this.evalBody(exp, env);
    }
    eval(exp, env = this.global) {
        if (this.isNumber(exp)) {
            return exp;
        }
        if (this.isString(exp)) {
            return exp.slice(1, -1);
        }
        if (exp[0] === "begin") {
            const blockEnv = new Environment_1.Environment({}, env);
            return this.evalBlock(exp, blockEnv);
        }
        if (exp[0] === "var") {
            const [_, name, value] = exp;
            return env.define(name, this.eval(value, env));
        }
        if (exp[0] === "set") {
            const [_, ref, value] = exp;
            if (ref[0] === "prop") {
                const [_tag, instance, propName] = ref;
                const instanceEnv = this.eval(instance, env);
                return instanceEnv.define(propName, this.eval(value, env));
            }
            return env.assign(ref, this.eval(value, env));
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
        if (exp[0] === "def") {
            const varExp = this.transformer.transformDefToLambda(exp);
            return this.eval(varExp, env);
        }
        if (exp[0] === "switch") {
            const ifExp = this.transformer.transformSwitchToIf(exp);
            return this.eval(ifExp, env);
        }
        if (exp[0] === "lambda") {
            const [_tag, params, body] = exp;
            return {
                params,
                body,
                env,
            };
        }
        if (exp[0] === "class") {
            const [_tag, name, parent, body] = exp;
            const parentEnv = this.eval(parent, env) || env;
            const classEnv = new Environment_1.Environment({}, parentEnv);
            this.evalBody(body, classEnv);
            return env.define(name, classEnv);
        }
        if (exp[0] === "super") {
            const [_tag, className] = exp;
            return this.eval(className, env).parent;
        }
        if (exp[0] === "new") {
            const classEnv = this.eval(exp[1], env);
            const instanceEnv = new Environment_1.Environment({}, classEnv);
            const args = exp.slice(2).map((arg) => this.eval(arg, env));
            this.callUserDefinedFunction(classEnv.lookup("constructor"), [
                instanceEnv,
                ...args,
            ]);
            return instanceEnv;
        }
        if (exp[0] === "prop") {
            const [_tag, instance, name] = exp;
            const instanceEnv = this.eval(instance, env);
            return instanceEnv.lookup(name);
        }
        if (exp[0] === "module") {
            const [_tag, name, body] = exp;
            const moduleEnv = new Environment_1.Environment({}, env);
            this.evalBody(body, moduleEnv);
            return env.define(name, moduleEnv);
        }
        if (exp[0] === "import") {
            // need to import source code - can add a caching layer
            const [_tag, name] = exp;
            const moduleSrc = fs_1.default.readFileSync(`${__dirname}/modules/${name}.eva`, "utf-8");
            const body = parser_1.default.parse(`(begin ${moduleSrc})`);
            const moduleExp = ["module", name, body];
            return this.eval(moduleExp, env);
        }
        if (Array.isArray(exp)) {
            const fn = this.eval(exp[0], env);
            const args = exp.slice(1).map((arg) => this.eval(arg, env));
            if (typeof fn === "function") {
                return fn(...args);
            }
            return this.callUserDefinedFunction(fn, args);
        }
        throw `Unimplemented ${JSON.stringify(exp)}`;
    }
    callUserDefinedFunction(fn, args) {
        // 2. User defined functions
        const activationRecord = {};
        fn.params.forEach((param, index) => {
            activationRecord[param] = args[index];
        });
        // environment is captured environment
        const activationEnv = new Environment_1.Environment(activationRecord, fn.env);
        return this.evalBody(fn.body, activationEnv);
    }
    evalBody(body, env) {
        if (body[0] === "begin") {
            return this.evalBlock(body, env);
        }
        return this.eval(body, env);
    }
    evalBlock(block, env) {
        let result;
        const [_tag, ...expressions] = block;
        expressions.forEach((exp) => {
            result = this.eval(exp, env);
        });
        return result;
    }
    isNumber(exp) {
        return typeof exp === "number";
    }
    isString(exp) {
        return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
    }
    isVariableName(exp) {
        return ((typeof exp === "string" && /^[+\-*/<>=-zA-Z][a-zA-Z0-9_]*$/.test(exp)) ||
            ["<=", ">="].includes(exp));
    }
}
exports.Atlas = Atlas;
