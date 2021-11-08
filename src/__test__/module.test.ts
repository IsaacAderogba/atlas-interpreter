describe("Module tests", () => {
  it("should evaluate module functions", () => {
    expect(
      atlas.run(`
    (module Math
      (begin
        (def abs (value)
          (if (< value 0)
              (- value)
              value))
        (def square (x)
          (* x x))
        (var MAX_VALUE 1000)
      )
    )
    ((prop Math abs) (- 10))
  `)
    ).toEqual(10);
    expect(
      atlas.run(`
    (var abs (prop Math abs))
    (abs (- 10))
  `)
    ).toEqual(10);
    expect(
      atlas.run(`
    (prop Math MAX_VALUE)
  `)
    ).toEqual(1000);
  });
});
