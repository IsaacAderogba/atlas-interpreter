describe("Math tests", () => {
  it("should evaluate math expressions", () => {
    expect(atlas.eval(["+", 1, 5])).toEqual(6);
    expect(atlas.eval(["+", ["+", 3, 2], 5])).toEqual(10);
    expect(atlas.eval(["+", ["*", 3, 2], 5])).toEqual(11);
  });
});
