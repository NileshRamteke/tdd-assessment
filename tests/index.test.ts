import { describe, expect, test } from "@jest/globals";
const add = require("../src/index.ts");
describe("Add function module", () => {
  test("check for empty string sum to be 0", () => {
    const sum: number = add("");
    expect(sum).toBe(0);
  });
  test("check for single number sum", () => {
    const sum: number = add("2");
    expect(sum).toBe(2);
  });
  test("check for multiple numbers sum", () => {
    const sum: number = add("2,3,7");
    expect(sum).toBe(12);
  });
  test("check for newline characters to be allowed as delimitters in numbers list string", () => {
    const sum: number = add("1\n2,7\n5");
    expect(sum).toBe(15);
  });
  test("check for negative numbers not allowed", () => {
    expect(() => {
      add("1\n2,7\n-5");
    }).toThrow("Negative numbers not allowed");
  });
  test("test delimiter change syntax //[delimiter]\n[numbers…]: 1", () => {
    const sum: number = add("//;\n1;2;3");
    expect(sum).toBe(6);
  });
  test("test delimiter change syntax //[delimiter]\n[numbers…]: 2", () => {
    const sum: number = add("//**\n1**2**3");
    expect(sum).toBe(6);
  });
  test("test delimiter change syntax //[delimiter1][delimiter2]...\n[numbers…]: 3", () => {
    const sum: number = add("//[##][%]\n1##2%3");
    expect(sum).toBe(6);
  });
  test("test 1 ignore numbers greater than 1000: 1", () => {
    const sum: number = add("//;\n1;2;3;3000");
    expect(sum).toBe(6);
  });
});
