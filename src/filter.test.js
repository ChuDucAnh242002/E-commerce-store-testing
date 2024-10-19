import filter from './filter.js';

test('First test', () => {
    const users = [
        { 'user': 'barney', 'active': true},
        { 'user': 'fred',   'active': false }
    ]
    const result1 = [{"user": "barney", "active": true}]

    expect(filter(users, ({active}) => active)).toStrictEqual(result1)
});