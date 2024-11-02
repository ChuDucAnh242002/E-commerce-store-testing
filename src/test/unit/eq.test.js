import eq from "../../eq";

describe('Test eq function', () => {
    test('Should be true for the same object', () => {
        const object = { a: 1 };
        expect(eq(object, object)).toBe(true);
    });
  
    test('Should be false for same object values different references', () => {
        const object1 = { a: 1 };
        const object2 = { a: 1 };
        expect(eq(object1, object2)).toBe(false);
    });
  
    test('Should be true for two identical string values', () => {
        expect(eq('ぁ', 'ぁ')).toBe(true);
    });

    test('Should be false for different string values', () => {
        expect(eq('ぁ', 'ぃ')).toBe(false);
    });
  
    test('Should be true for string and wrapped string in Object', () => {
        expect(eq('a', Object('a'))).toBe(true);
    });

    test('Should be true for string and wrapped string in String', () => {
        expect(eq('a', String('a'))).toBe(true);
    });
  
    test('Should be true when both values are NaN', () => {
        expect(eq(NaN, NaN)).toBe(true);
    });
  
    test('Should be true when comparing different value types', () => {
        expect(eq(1, '1')).toBe(true);
    });

    test('Should be true for two boolean values that are both true or both false', () => {
        expect(eq(true, true)).toBe(true);
        expect(eq(false, false)).toBe(true);
    });

    test('Should be false for different boolean values', () => {
        expect(eq(true, false)).toBe(false);
    });

    test('Should be true when comparing null and undefined', () => {
        expect(eq(null, undefined)).toBe(true);
    });

    test('Should be true when both values are null or both are undefined', () => {
        expect(eq(null, null)).toBe(true);
        expect(eq(undefined, undefined)).toBe(true);
    });

    test('Should be true for equal numbers', () => {
        expect(eq(2, 2)).toBe(true);
    });
  
    test('Should be false for different numbers', () => {
        expect(eq(1.2, 2.1)).toBe(false);
    });

    test('Should be false for different decimal (overflow)', () => {
        const a = 1.0000000000000001
        const b = 1.0000000000000009
        expect(eq(a, b)).toBe(false);
    });
  
});