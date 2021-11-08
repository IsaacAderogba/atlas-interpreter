describe("Math tests", () => {
  it("should parse simple variable declaration with initializer", () => {
    expect(atlas.eval(["+", 1, 5])).toEqual(6);
    expect(atlas.eval(["+", ["+", 3, 2], 5])).toEqual(10);
    expect(atlas.eval(["+", ["*", 3, 2], 5])).toEqual(11);
  });
});
