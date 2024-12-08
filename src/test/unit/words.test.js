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

    test("Should return all words matching a simple pattern", () => {
        const test = "The black cat eats the crazy fish"
        const pattern = /\b\w+\b/g
        const result = ["The", "black", "cat", "eats", "the", "crazy", "fish"]
        expect(words(test, pattern)).toStrictEqual(result)
    });

    test("Should return words that has a specific starting letter", () => {
        const test = "Apple ananas avocado basmasi tram bus anaconda astronaut"
        const pattern = /\b[aA]\w*/g
        const expected = ["Apple", "ananas", "avocado", "anaconda", "astronaut"]
        expect(words(test, pattern)).toStrictEqual(expected)
    });

    test("Should return words that has a specific ending letter", () => {
        const test = "Cat fat that sad mad bat hat rat"
        const pattern = /\b\w*t\b/g
        const expected = ["Cat", "fat", "that", "bat", "hat", "rat"]
        expect(words(test, pattern)).toStrictEqual(expected)
    });

    test("Should return containing a specific substring", () => {
        const test = "dont die, Dont lie, doNt see, dOnt know, well you dONT, because I DOnt know"
        const pattern = /\b\w*dont\w*\b/g
        const expected = ["dont"]
        expect(words(test, pattern)).toStrictEqual(expected)
    });

    test("Should return empty array when no matches are found", () => {
        const test = "Nothing is here"
        const pattern = /\b\w*abc\w*\b/g
        const expected = []
        expect(words(test, pattern)).toStrictEqual(expected)
    });

    test("Should return words that match a complex pattern", () => {
        const test = "coding Coding doding code"
        const pattern = /\b[cC]o\w*/g
        const expected = ["coding", "Coding", "code"]
        expect(words(test, pattern)).toStrictEqual(expected)
    });

    test("Should handle punctuation correctly", () => {
        const test = "Hi! Jon. I wouldn't like coffee."
        const pattern = /\b\w+\b/g
        const expected = ["Hi", "Jon", "I", "wouldn", "t", "like", "coffee"]
        expect(words(test, pattern)).toStrictEqual(expected)
    });

    test("Should work with an empty string", () => {
        const test = ""
        const pattern = /\b\w+\b/g
        const expected = []
        expect(words(test, pattern)).toStrictEqual(expected)
    });
})

describe("Negative test cases for words function", () => {
    test("Should return empty array for non-matching pattern", () => {
        const test = "Hello my name is Jon Doe!"
        const pattern = /\d+/g
        const expected = []
        expect(words(test, pattern)).toStrictEqual(expected)
    });
    
    test("Should throw error for invalid pattern", () => {
        const test = "Hello my name is Nazy!"
        const pattern = "[a-"
        expect(() => words(test, pattern)).toThrow(SyntaxError)
    });

    test("Should throw a TypeError for null input", () => {
        const test = null
        const pattern = /\w+/g
        expect(() => words(test, pattern)).toThrow(TypeError)
    });

    test("Should throw a TypeError for undefined input", () => {
        const test = undefined
        const pattern = /\w+/g
        expect(() => words(test, pattern)).toThrow(TypeError)
    });

    test("Should throw a TypeError for null pattern", () => {
        const test = "start"
        const pattern = null
        expect(() => words(test, pattern)).toThrow(TypeError)
    });

    test("Should through a TypeError for undefined pattern", () => {
        const test = "start"
        const pattern = undefined
        expect(() => words(test, pattern)).toThrow(TypeError)
    });

    test("Should return empty array for empty pattern", () => {
        const test = "Hello, hi there!"
        const pattern = ""
        const expected = [""]
        expect(() => words(test, pattern)).toStrictEqual(expected)
    });

    test("Should throw TypeError for non-string input as string param", () => {
        const test = 50358922
        const pattern = /\w+/g
        const test2 = "Helle"
        const pattern2 = 22985305
        expect(() => words(test, pattern)).toThrow(TypeError)
        expect(() => words(test2, pattern2)).toThrow(TypeError)
    });

    test("Should handle very long string", () => {
        const test = "a".repeat(10 ** 6)
        const pattern = /\w+/g
        const result = words(test, pattern)
        expect(result.length).toBe(1)
        expect(result[0]).toBe(test)
    });
    
    test("Should throw a TypeError when called with missing params", () => {
        expect(() => words()).toThrow(TypeError)
    });
})