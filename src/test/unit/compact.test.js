import compact from "../../compact";
describe('test Compact function', () => {
    test('Should removes false values from an array', () => {
      const input = [0, 1, false, 2, '', 3, null, undefined, NaN];
      const expected = [1, 2, 3];
      expect(compact(input)).toEqual(expected);
    });
  
    test('Should returns an empty array when inputs are all false', () => {
      const input = [0, false, '', null, undefined, NaN];
      const expected = [];
      expect(compact(input)).toEqual(expected);
    });
  
    test('Should returns the same array if all elements are true', () => {
      const input = [1, 2, 3, 'hello', true];
      const expected = [1, 2, 3, 'hello', true];
      expect(compact(input)).toEqual(expected);
    });
  
    test('Should handles an empty array to be itself', () => {
      const input = [];
      const expected = [];
      expect(compact(input)).toEqual(expected);
    });
  
    test('Should handles arrays with complex data types', () => {
      const input = [0, 1, {}, [], () => {}, false];
      const expected = [1, {}, [], () => {}];
      expect(compact(input)).toEqual(expected);
    });
  });