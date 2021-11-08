"use strict";
describe("If expect().toEquals", () => {
    it("should built-in expect().toEquals", () => {
        expect(atlas.run(`
        (begin
          (def square (x)
            (* x x))
          (square 2)
        )
      `)).toEqual(4);
        // Complex body:
        expect(atlas.run(`
        (begin
          (def calc (x y)
            (begin
              (var z 30)
              (+ (* x y) z)
            ))
          (calc 10 20)
        )
      `)).toEqual(230);
        // Closure:
        expect(atlas.run(`
        (begin
          (var value 100)
          (def calc (x y)
            (begin
              (var z (+ x y))
              (def inner (foo)
                (+ (+ foo z) value))
              inner
            ))
          (var fn (calc 10 20))
          (fn 30)
        )
      `)).toEqual(160);
        // Recursive function:
        expect(atlas.run(`
        (begin
          (def factorial (x)
            (if (= x 1)
              1
              (* x (factorial (- x 1)))))
          (factorial 5)
        )
      `)).toEqual(120);
    });
});
