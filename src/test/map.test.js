import map from '../map.js'

test('Map first test', () => {
    const test1 = [4, 8]
    const result1 = [16, 64]

    function square(n) {
        return n * n
    }

    expect(map(test1, square)).toStrictEqual(result1)
});