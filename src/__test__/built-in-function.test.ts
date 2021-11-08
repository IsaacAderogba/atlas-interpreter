describe("Built-in tests", () => {
  it("should evaluate built-in functions", () => {
    // Math functions:

    expect(atlas.run(`(+ 1 5)`)).toEqual(6);
    expect(atlas.run(`(+ (+ 2 3) 5)`)).toEqual(10);
    expect(atlas.run(`(+ (* 2 3) 5)`)).toEqual(11);

    // Comparison:

    expect(atlas.run(`(> 1 5)`)).toEqual(false);
    expect(atlas.run(`(< 1 5)`)).toEqual(true);

    expect(atlas.run(`(>= 5 5)`)).toEqual(true);
    expect(atlas.run(`(<= 5 5)`)).toEqual(true);
    expect(atlas.run(`(=  5 5)`)).toEqual(true);
  });
});
