"use strict";
describe("Block tests", () => {
    it("should evaluate block expressions", () => {
        expect(atlas.eval(["+", 1, 5])).toEqual(6);
        expect(atlas.eval(["+", ["+", 3, 2], 5])).toEqual(10);
        expect(atlas.eval(["+", ["*", 3, 2], 5])).toEqual(11);
        expect(atlas.eval([
            "begin",
            ["var", "x", 10],
            ["var", "y", 20],
            ["+", ["*", "x", "y"], 30],
        ])).toEqual(230);
        // Nested environments.
        expect(atlas.eval([
            "begin",
            ["var", "x", 10],
            ["begin", ["var", "x", 20], "x"],
            "x",
        ])).toEqual(10);
        // Access parent variables:
        // Identifier Resolution.
        expect(atlas.eval([
            "begin",
            ["var", "value", 10],
            ["var", "result", ["begin", ["var", "x", ["+", "value", 10]], "x"]],
            "result",
        ])).toEqual(20);
        // Update parent variables.
        expect(atlas.eval([
            "begin",
            ["var", "data", 10],
            ["begin", ["set", "data", 100]],
            "data",
        ])).toEqual(100);
    });
});
