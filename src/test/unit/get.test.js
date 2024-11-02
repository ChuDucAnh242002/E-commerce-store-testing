import get from '../../get';

describe('Test get function', () => {
    const object = { 
        a: [{ b: { c: 3 } }, 2],
        d: { e: 5 },
        f: 0,
    };

    const defaultReturn = 'default';

    test('Should return the value at given string path', () => {
        expect(get(object, 'a[0].b.c')).toBe(3);
        expect(get(object, 'd.e')).toBe(5);
        expect(get(object, 'f')).toBe(0);
    });

    test('Should return the value at given array path', () => {
        expect(get(object, ['a', '0', 'b', 'c'])).toBe(3);
        expect(get(object, ['d', 'e'])).toBe(5);
    });

    test('Should return undefined for non-existing path', () => {
        expect(get(object, 'a[1].b.c')).toBeUndefined();
        expect(get(object, 'e')).toBeUndefined();
    });

    test('Should return the default value if invalid path', () => {
        expect(get(object, 'a[1].b.c', defaultReturn)).toBe(defaultReturn);
        expect(get(object, 'e', defaultReturn)).toBe(defaultReturn);
    });

    test('Should handle null or undefined objects', () => {
        expect(get(null, 'a.b', defaultReturn)).toBe(defaultReturn);
        expect(get(undefined, 'a.b', defaultReturn)).toBe(defaultReturn);
    });

    test('Should handle invalid paths type', () => {
        expect(get(object, 123, defaultReturn)).toBe(defaultReturn);
        expect(get(object, true, defaultReturn)).toBe(defaultReturn);
        expect(get(object, { key: 'value' }, defaultReturn)).toBe(defaultReturn);
    });

    test('Should handle cases where path is a non-standard format', () => {
        expect(get(object, 'a[0].b[.c]', defaultReturn)).toBe(defaultReturn);
        expect(get(object, 'a[0].b.c.d', defaultReturn)).toBe(defaultReturn);
    });

    test('Should handle array as the target object', () => {
        expect(get(object.a, '[0].b')).toBe(object.a[0].b);
        expect(get(object.a, '[1]')).toBe(2);
        expect(get(object.a, '[0].b.c')).toBe(3);
    });

    test('Should return the entire object if an empty path is provided', () => {
        expect(get(object, '')).toBe(object);
        expect(get(object, [])).toBe(object);
    });
});
