import {describe, expect, test} from '@jest/globals';
const add = require("../src/index.ts");
describe('Add function module', () => {
    test('check for empty string sum to be 0', () => { 
        expect(add("")).toBe(0)
    });
});