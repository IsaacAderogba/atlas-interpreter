describe("If tests", () => {
  it("should built-in tests", () => {
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
