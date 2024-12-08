import map from '../../map.js'

const array1 = [12, 5, 23, 8, 42, 15, 7, 38, 16, 29];

const users_simple = [
    { user: 'barney', active: false, age: 25 },
    { user: 'wilma', active: true, age: 32 },
];

describe("Positive test cases for map function", () => {
    test('Map first test', () => {
        const test1 = [4, 8]
        const result1 = [16, 64]
    
        function square(n) {
            return n * n
        }
    
        expect(map(test1, square)).toStrictEqual(result1)
    });

    test('Should map all the input with *2 ', () => {
        const result = [24, 10, 46, 16, 84, 30, 14, 76, 32, 58];
        expect(map(array1, x => x*2)).toStrictEqual(result);
    })

    test('Should handle string values', () => {
        const input = ['a', 'b', 'c']
        const result = ['A', 'B', 'C']
        expect(map(input, char => char.toUpperCase())).toStrictEqual(result);
    })

    test('Should keep original array', () => {
        map(array1, x => x + 1);
        expect(array1).toStrictEqual(array1);
    })

    test('Should handle with object', () => {
        const result = [26, 33];
        expect(map(users_simple, ({age}) => age + 1)).toStrictEqual(result);
    })

    test('Should works when passing index and array to iteratee', () => {
        const input = [10, 20, 30];
        const result = [0, 20, 60];
        expect(map(input, (num, index) => num * index)).toStrictEqual(result);
    })

    test('Should handles functions as elements in the array', () => {
        const input = [
            () => 1,
            () => 2,
            () => 3
        ];
        const result = [1,2,3];
        expect(map(input, func => func())).toStrictEqual(result);
    })

    test('Should works with mixed data types', () => {
        const input = [1, 'jane', true, null];
        const result = ['number', 'string', 'boolean', 'object'];
        expect(map(input, val => typeof val)).toStrictEqual(result);
    });
})

describe("Negative tests cases for map function", () => {
    test('Should throw a TypeError when input is not an array', () => {
        const input = "Jane";
        expect(map(input, x => x * 2)).toThrow(TypeError);
    });

    test('Should throw an error when the iteratee is not a function', () => {
        const input = [1, 2, 3];
        expect(() => map(input, "Jane")).toThrow(TypeError);
    })

    test('Should handle undefined elements', () => {
        const input = [undefined, 2];
        const result = [NaN, 4];
        const input2 = [null, 3];
        const result2 = [NaN, 6];

        expect(map(input, x => x * 2)).toStrictEqual(result);
        expect(map(input2, x => x * 2)).toStrictEqual(result2);
    })

    test('Should return empty when array is empty', () => {
        const result = [];
        expect(map([], x => x*2)).toStrictEqual(result);
        expect(map(null, x => x*2)).toStrictEqual(result);
        expect(map(undefined, x => x*2)).toStrictEqual(result);
    })

    test('Should handle large size array without crashing', () => {
        const input = new Array(1e6).fill(1);
        const result = new Array(1e6).fill(2);
        expect(map(input, x => x + 1)).toStrictEqual(result);
    })
})