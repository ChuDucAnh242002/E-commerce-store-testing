import words from '../../words.js'

describe("Positive test cases for words function", () => {
    test("First words test", () => {
        const test1 = 'fred, barney, & pebbles'
        const result1 = ['fred', 'barney', 'pebbles']
    
        expect(words(test1)).toStrictEqual(result1)
    });
    
    test("Second words test", () => {
        const test2 = 'fred, barney, & pebbles'
        const pattern = /[^, ]+/g
    
        const result2 = ['fred', 'barney', '&', 'pebbles']
    
        expect(words(test2, pattern)).toStrictEqual(result2)
    });
})