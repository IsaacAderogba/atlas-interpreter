"use strict";
describe("While tests", () => {
    it("should evaluate while expressions", () => {
        expect(atlas.eval([
            "begin",
            ["var", "counter", 0],
            [
                "while",
                ["<", "counter", 10],
                // counter++
                // TODO: implement ['++', <Exp>]
                ["set", "counter", ["+", "counter", 1]],
            ],
            "counter",
        ])).toEqual(10);
    });
});
