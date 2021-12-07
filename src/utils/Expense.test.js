import { calaulateExp } from "./func";

// describe("add", () => {
//   it("should return 3 if a = 1, b = 2", () => {
//     const inputA = 1;
//     const inputB = 2;
//     expect(add(inputA, inputB)).toEqual(3);
//   });

//   it("should return 3 if a = 1, b = 2", () => {
//     const inputA = 1;
//     const inputB = 2;
//     const inputC = 5;
//     expect(add(inputA, inputB)).toEqual(3);
//   });

//   it('should return 3 if a = "1", b = "2"', () => {
//     const inputA = "1";
//     const inputB = "2";
//     expect(add(inputA, inputB)).toEqual(3);
//   });
// });

describe("calaulateExp", () => {
  it("should return 400 if a = 1000, b = 600", () => {
    const inputA = 1000;
    const inputB = 600;
    expect(calaulateExp(inputA, inputB)).toEqual(400);
  });
});

//run npm test
