import ceil from '../../ceil';

describe('Test ceil function', () => {

    test('Should round up to the nearest number', () => {
        expect(ceil(4.006)).toBe(5);
        expect(ceil(6.5)).toBe(7);
        expect(ceil(-1.2)).toBe(-1);
        
    });

    test('Should round special numbers to itself', () => {
        expect(ceil(Infinity)).toBe(Infinity);
        expect(ceil(-Infinity)).toBe(-Infinity);
        expect(ceil(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    });
  
    test('Should round up with positive precision', () => {
        expect(ceil(4.006, 2)).toBe(4.01);
        expect(ceil(3.14159, 3)).toBe(3.142);
    });
  
    test('Should round up with negative precision', () => {
        expect(ceil(1040, -2)).toBe(1100);
        expect(ceil(154, -1)).toBe(160);
        expect(ceil(12345, -3)).toBe(13000);
    });
  
    test('Should be the same number if precision is zero', () => {
        expect(ceil(1.009, 0)).toBe(2);
        expect(ceil(1.9, 0)).toBe(2);
        expect(ceil(1.0, 0)).toBe(1);
    });
  
    test('Should handle large positive and negative precision', () => {
        expect(ceil(1.2345, 292)).toBe(1.2345);
        expect(ceil(1.2345, -292)).toBe(1e+292);
    });
  
    test('Should handle non numeric values as NaN', () => {
        expect(ceil(NaN)).toBeNaN();
        expect(ceil('abc')).toBeNaN();
        expect(ceil(undefined)).toBeNaN();
        expect(ceil(true)).toBeNaN();
        expect(ceil(null)).toBeNaN();
    });
  
    test('Should handle rounding very large and very small numbers', () => {
        expect(ceil(1e10, -5)).toBe(10000000000);
        expect(ceil(-1e-10, 10)).toBe(-1e-10);
    });
    
});