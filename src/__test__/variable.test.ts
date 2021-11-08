describe("Variable tests", () => {
  it("should evaluate variable expressions", () => {
    expect(atlas.eval(["var", "x", 10])).toEqual(10);
    expect(atlas.eval("x")).toEqual(10);

    expect(atlas.eval(["var", "y", 100])).toEqual(100);
    expect(atlas.eval("y")).toEqual(100);

    expect(atlas.eval("VERSION")).toEqual("0.1");

    expect(atlas.eval(["var", "isUser", "true"])).toEqual(true);

    expect(atlas.eval(["var", "z", ["*", 2, 2]])).toEqual(4);
    expect(atlas.eval("z")).toEqual(4);
  });
});
