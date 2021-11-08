"use strict";
describe("Switch tests", () => {
    it("should evaluate switch statements", () => {
        expect(atlas.run(`
      (begin
        (var x 10)
        (switch ((= x 10) 100)
                ((> x 10) 200)
                (else     300))
      )
    `)).toEqual(100);
    });
});
