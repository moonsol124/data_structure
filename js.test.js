//test 
// const { default: test } = require('node:test');
const js = require('./js');
// import js from './js';

describe("Get middle index function", () => {
    test('start 0, end 8 output must be 4.', () =>{
        expect(js.getMiddleIndex(0,8)).toBe(4);
    });
    test('start 0, end 7 output must be 3', () =>{
        expect(js.getMiddleIndex(0, 7)).toBe(3);
    });
});

describe("get left function test", () => {
    test('array [1,2,3,4] to be [1]', () => {
        expect(js.getLeft([1,2,3,4], 1)).toEqual([1]);
    })
    test('array [1,2,3,4,5] to be [1,2]', () => {
        expect(js.getLeft([1,2,3,4,5], 2)).toEqual([1,2]);
    })
})

describe("get right function test", () => {
    test('array[1,2,3,4] to be [3,4]', () => {
        expect(js.getRight([1,2,3,4], 2)).toEqual([3,4]);
    })

    test('array [1,2,3,4,5] to be [4,5]', () => {
        expect(js.getRight([1,2,3,4,5], 3)).toEqual([4,5]);
    })
})