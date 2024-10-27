import add from "../add";


describe('Test add function', () => {
    test('Should add two numbers', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-5, 4)).toBe(-1);
        expect(add(0, 0)).toBe(0);
        expect(add(1.5, 2.5)).toBe(4);
    });
  
    test('Should be the non-undefined value when one argument is undefined', () => {
        expect(add(6, undefined)).toBe(6);
        expect(add(undefined, 4)).toBe(4);
    });
  
    test('Should be 0 when both arguments are undefined', () => {
        expect(add(undefined, undefined)).toBe(0);
    });
  
    test('Should handle addition with strings that can be converted to numbers', () => {
        expect(add("-5", "10")).toBe(5);
        expect(add("3.2", "1.8")).toBe(5);
    });
  
    test('Should concatenate strings if at least one argument is a non-numeric string', () => {
        expect(add(1, " apples")).toBe("1 apples");
        expect(add("Hello", 1)).toBe("Hello1");
        expect(add("I", " am")).toBe("I am");
    });
  
    test('Should handle addition with a mix of numbers and strings', () => {
        expect(add(1, "2")).toBe(3);
        expect(add("1", 2)).toBe(3);
    });
  
    test('Should be NaN if either argument is a symbol not number', () => {
        expect(add(Symbol('a'), 5)).toBeNaN();
        expect(add(5, Symbol('b'))).toBeNaN();
    });

    test('Should be valid if either argument is a symbol number', () => {
        expect(add(Symbol('6'), 5)).toBe(11);
        expect(add(5, Symbol('-6'))).toBe(-1);
    });
  
    test('Should be NaN if one of the values cannot be converted to a number', () => {
        expect(add({}, 4)).toBeNaN();
        expect(add(5, [])).toBeNaN();
        expect(add([], [])).toBeNaN();
        expect(add('5', {a : 'b'})).toBeNaN();
        expect(add(true, 4)).toBeNaN();
        expect(add(null, 0)).toBeNaN();
        expect(add(0, null)).toBeNaN();
    });
});