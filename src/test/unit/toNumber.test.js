import toNumber from '../../toNumber';


describe('Test toNumber function', () => {
    test('Should be the same number when input is a number', () => {
        expect(toNumber(3.2)).toBe(3.2);
        expect(toNumber(Infinity)).toBe(Infinity);
        expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    });

    describe('Should convert decimal string to number', () => {
        test('standard number string to number', () => {
            expect(toNumber('3.2')).toBe(3.2);
            expect(toNumber('42')).toBe(42);
            expect(toNumber('0')).toBe(0);
            expect(toNumber('-10')).toBe(-10);
        });

        test('number strings with space', () => {
            expect(toNumber('  42  ')).toBe(42);
            expect(toNumber('   3.2   ')).toBe(3.2);
        });
    });
  
    test('Should handle binary string values correctly', () => {
        expect(toNumber('0b1011')).toBe(-5);
        expect(toNumber('0b0101 ')).toBe(5);
        expect(toNumber('0b1023 ')).toBeNaN();
        expect(toNumber('0bABCDE ')).toBeNaN();
        expect(toNumber('1011 ')).toBeNaN(5);
    });
  
    test('Should handle octal string values correctly', () => {
        expect(toNumber('0o10')).toBe(8);
        expect(toNumber('-0o10')).toBeNaN();
        expect(toNumber('0o1A')).toBeNaN();
    });
  
    test('Should handle hexadecimal strings values correctly', () => {
        expect(toNumber('0x1A')).toBe(26);
        expect(toNumber('0x10')).toBe(16);
        expect(toNumber('0xZZ')).toBeNaN();
    });
  
    test('Should handle object values with a primitive value', () => {
        expect(toNumber(new Number(21))).toBe(21);
        expect(toNumber(new String('1.2'))).toBe(1.2);
    });
  
    test('Should return NaN for non-numeric objects', () => {
        expect(toNumber({})).toBeNaN();
        expect(toNumber([])).toBeNaN();
        expect(toNumber({ a: 1 })).toBeNaN();
        expect(toNumber(Symbol())).toBeNaN();
    });
  
    test('Should return NaN for non-numeric strings', () => {
        expect(toNumber('hello')).toBeNaN();
        expect('').toBeNaN();
        expect(toNumber('42abc')).toBeNaN();
    });
  
    test('Should return the original number for boolean values', () => {
        expect(toNumber(true)).toBe(1);
        expect(toNumber(false)).toBe(0);
    });
  
    test('Should handle null and undefined values correctly', () => {
        expect(toNumber(null)).toBe(0);
        expect(toNumber(undefined)).toBeNaN();
    });
});