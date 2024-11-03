import reduce from '../../reduce.js'

describe("Positive test cases for reduce function", () => {
    test('Should sum all value', () => {
        expect(reduce([1, 2], (sum, n) => sum + n, 0)).toStrictEqual(3)
    });
    
    test("Should handle with object", () => {
        const collection = { 'a': 1, 'b': 2, 'c': 1 }
        const iteratee = (result, value, key) => {
            ((result[value] = []) || result[value]).push(key)
            return result
        }
        const expected = { '1': ['a', 'c'], '2': ['b'] }
        expect(reduce(collection, iteratee, {})).toBe(expected)
    });

    test('Should accumulate with initial value', () => {
        const input = [5, 10];
        const iteratee = (acc, num) => acc * num;
        const expected = 50;
        
        expect(reduce(input, iteratee, 1)).toStrictEqual(expected);
    });

    test('Should work with an array of objects', () => {
        const input = [
            { value: 1 },
            { value: 2 },
            { value: 3 }
        ];
        const iteratee = (acc, obj) => acc + obj.value;
        const expected = 6;
        expect(reduce(input, iteratee, 0)).toStrictEqual(expected);
    })

    test('Should find maximum value in an array', () => {
        const input = [5, 1, 7, 3];
        const iteratee = (acc, num) => (num > acc ? num : acc);
        const expected = 7;
        expect(reduce(input, iteratee, 0)).toStrictEqual(expected);
    })

    test('Should return the initial accumulator when collection is empty', () => {
        const input = [];
        const iteratee = (acc, num) => acc + num;
        const expected = 0;
        expect(reduce(input, iteratee, 0)).toStrictEqual(expected);
    })

    test('Should accumulate values with mixed data types', () => {
        const input = [1, '2', 3, '4'];
        const iteratee = (acc, num) => acc + Number(num);
        const expected = 10;
        expect(reduce(input, iteratee, 0)).toStrictEqual(expected);
    })

    test('Should flatten an array when concat', () => {
        const input = [[1, 2], [3, 4], [5]];
        const iteratee = (acc, arr) => acc.concat(arr);
        const expected = [1, 2, 3, 4, 5]
        expect(reduce(input, iteratee, [])).toStrictEqual(expected);
    })
});