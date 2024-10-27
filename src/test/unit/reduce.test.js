import reduce from '../../reduce.js'

test("First reduce test", () => {
    expect(reduce([1, 2], (sum, n) => sum + n, 0)).toStrictEqual(3)
});

test("Second reduce test", () => {
    const collection = { 'a': 1, 'b': 2, 'c': 1 }
    const iteratee = (result, value, key) => {
        ((result[value] = []) || result[value]).push(key)
        return result
    }
    const answer = { '1': ['a', 'c'], '2': ['b'] }
    expect(reduce(collection, iteratee, {})).toBe(answer)
});