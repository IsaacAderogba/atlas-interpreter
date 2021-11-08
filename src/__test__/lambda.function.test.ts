describe("Lambda function tests", () => {
  it("should evaluate lambda functions", () => {
    // pass lambda function as a callback
    expect(
      atlas.run(`
      (begin
        (def onClick (callback)
          (begin
            (var x 10)
            (var y 20)
            (callback (+ x y))))
        (onClick (lambda (data) (* data 10)))
      )
    `)
    ).toEqual(300);

    // immediately-invoked lambda expression
    expect(
      atlas.run(`
      ((lambda (x) (* x x)) 2)
    `)
    ).toEqual(4);

    // Save lambda to a variable
    expect(
      atlas.run(`
      (begin
        (var square (lambda (x) (* x x)))
        (square 2))
      `)
    ).toEqual(4);
  });
});
