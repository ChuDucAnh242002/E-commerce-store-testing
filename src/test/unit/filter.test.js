import filter from '../../filter.js';

const users_simple = [
    { 'user': 'barney', 'active': true},
    { 'user': 'fred',   'active': false }
]

const users_complicated = [
    { user: 'barney', active: false, age: 25 },
    { user: 'wilma', active: true, age: 32 },
    { user: 'fred', active: false, age: 40 },
    { user: 'jane', active: true, age: 28 },
    { user: 'astro', active: false, age: 34 },
    { user: 'george', active: true, age: 22 },
    { user: 'betty', active: false, age: 29 },
    { user: 'elroy', active: true, age: 19 },
    { user: 'judy', active: false, age: 37 },
    { user: 'rosie', active: true, age: 45 }
];

const users_missing = [
    { user: 'barney', active: true, age: 32},
    { user: 'wilma', active: false, age: 25},
    { user: 'fred'},
    { active: false},
    { age: 34 },
    { active: true, age: 29},
    { user: 'betty', age: 22},
    { user: 'elroy', active: true},
    { user: 'judy', active: false, age: 37 },
    {}
];

const users_wrongtype = [
    { user: 21, active: 'barney', age: false},
    { user: 32, active: 'wilma', age: true}
]

describe("Positive test cases for filter function", () => {
    test('Should filter the user in simple case', () => {
        
        const result1 = [{"user": "barney", "active": true}]
    
        expect(filter(users_simple, ({active}) => active)).toStrictEqual(result1)
    });

    test('Should filter the user with active in complicated case', () => {
        const result = [
            {"user": "wilma", "active": true, age: 32 },
            {"user": "rosie", "active": true, age: 45 },
        ]
        expect(filter(users_complicated, ({active, age}) => active && age >= 30)).toStrictEqual(result)
    })

    test('Should filter the user with no active in complicated case', () => {
        const result = [
            {"user": "barney", "active": false, age: 25 },
            {"user": "betty", "active": false, age: 29 },
        ]
        expect(filter(users_complicated, ({active, age}) => active == false && age < 30)).toStrictEqual(result)
    })

    test('Should filter the user start with char', () => {
        const result = [
            { user: 'barney', active: false, age: 25 },
            { user: 'betty', active: false, age: 29 }
        ]
        expect(filter(users_complicated, ({user}) => user.startsWith("b"))).toStrictEqual(result)
    })
})

describe("Negative test cases for filter function", () => {
    test('Should filter the user when predicate requires undefined value', () => {
        const result = [
            {"active" : false},
            {"age": 34},
            {"active": true, "age": 29},
            {}
        ]
        expect(filter(users_missing, ({user}) => user == undefined || user == null)).toStrictEqual(result)
    })

    test('Should return empty array when the elements type of the array is incorrect', () => {
        const result = [[]]
        expect(filter(users_wrongtype, ({age}) => age >= 30)).toStrictEqual(result)
    })

    test('Should throw an TypeError when input is not an array', () => {
        const input = "Jane"
        expect(filter(input, x => x * 2)).toThrow(TypeError)
    });

    test('Should throw an TypeError when the iteratee is not a function', () => {
        const input = [1, 2, 3];
        expect(() => filter(input, "Jane")).toThrow(TypeError);
    });

    test('Should filter the user with missing information', () => {
        const result = [
            {"user": 'barney', "active": true, "age": 32},
            {"active": true, "age": 29}
        ]
        expect(filter(users_missing, ({active, age}) => active && age >= 28)).toStrictEqual(result)
    })

    test('Should return empty when array is empty', () => {
        const result = [[]]
        expect(filter(null, ({active}) => active)).toStrictEqual(result)
        expect(filter([], ({active}) => active)).toStrictEqual(result)
        expect(filter(undefined, ({active}) => active)).toStrictEqual(result)
    })
})
