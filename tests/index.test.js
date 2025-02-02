const add = require("../src/index");

test('check for empty string sum to be 0', () => { 
    expect(add("")).toBe(0)
 })