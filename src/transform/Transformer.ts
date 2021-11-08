export class Transformer {
  /**
   * Translates def-expression into a variable delcaration with a lambda expression
   */
  transformDefToLambda(exp) {
    const [_tag, name, params, body] = exp;
    return ["var", name, ["lambda", params, body]];
  }

  transformSwitchToIf(switchExp) {
    const [_tag, ...cases] = switchExp;

    const ifExp = ["if", null, null, null];

    let current: any = ifExp;

    for (let i = 0; i < cases.length - 1; i++) {
      const [currentCond, currentBlock] = cases[i];

      current[1] = currentCond;
      current[2] = currentBlock;

      const next = cases[i + 1];
      const [nextCond, nextBlock] = next;

      // this creates the nested if
      current[3] = nextCond === "else" ? nextBlock : ["if"];
      current = current[3];
    }

    return ifExp;
  }
}
