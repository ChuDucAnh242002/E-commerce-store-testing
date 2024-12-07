// Search products: need filter, map ,words
// Request products data: filter as well
// Response products data
// Display results to users
// Filtered requests
// Request filtered product data
// Display filtered results

import { browseProductCategory, searchProduct, filterSearchResults } from '../utils/Search';
import { products } from './products';

describe("Scenario 1: User browsing products", () => {
    let dbProducts = JSON.parse(JSON.stringify(products));

    beforeEach(() => {
        // Reset product to avoid modification
        dbProducts = JSON.parse(JSON.stringify(products));
    })
    const empty_expected = [[]]
    describe("Test browseProductCart function", () => {
        test('Should return empty array when products are empty array', () => {
            const category = "Fruit"
            const emptyProducts = []
            const result = browseProductCategory(emptyProducts, category)
            expect(result).toStrictEqual(empty_expected)
        });

        test("Should return empty array when the category doesn't exist", () => {
            const category = "non-existent category"
            const result = browseProductCategory(dbProducts, category)
            expect(result).toStrictEqual(empty_expected)
        });

        test("Should return multiple products which have the same category", () => {
            const category = "Fruit"
            const result = browseProductCategory(dbProducts, category)
            const expected = [
                {
                    id: 1,
                    name: 'Orange',
                    category: 'Fruit',
                    price: 2.5,
                    description: 'Fresh and juicy oranges',
                    quantity: 509
                }, 
                {
                    id: 2,
                    name: 'Banana',
                    category: 'Fruit',
                    price: 1.2,
                    description: 'Ripe bananas, perfect for snacking',
                    quantity: 340
                }
            ]
            expect(result).toStrictEqual(expected)
        })

        test("Should handle when the category is undefined", () => {
            const category = undefined
            const result = browseProductCategory(dbProducts, category)
            expect(result).toStrictEqual(empty_expected)
        });

        test("Should handle when the products is null", () => {
            const category = "Fruit"
            const nullProducts = null
            const result = browseProductCategory(nullProducts, category)
            expect(result).toStrictEqual(empty_expected)
        });
    });

    describe("Test searchProduct function", () => {
        test("Should return the product with existing key", () => {
            const searchKey = "Broccoli"
            const result = searchProduct(dbProducts, searchKey)
            const expected = [
                {
                    id: 3,
                    name: 'Broccoli',
                    category: 'Vegetable',
                    price: 3.0,
                    description: 'Fresh green broccoli florets',
                    quantity: 200
                }
            ]
            expect(result).toStrictEqual(expected)
        });

        test("Should handle when the key doesn't exist", () => {
            const searchKey = "haha"
            const result = searchProduct(dbProducts, searchKey)
            expect(result).toStrictEqual(empty_expected)
        });

        test("Should handle when products are empty array", () => {
            const searchKey = "Broccoli"
            const emptyProducts = []
            const result = searchProduct(emptyProducts, searchKey)
            expect(result).toStrictEqual(empty_expected)
        })

        test("Should handle when search key is null", () => {
            const searchKey = null
            const result = searchProduct(dbProducts, searchKey)
            expect(result).toStrictEqual(empty_expected)
        });

        test("Should handle when products are undefined", () => {
            const searchKey = "Broccoli"
            const undefinedProducts = undefined
            const result = searchProduct(dbProducts, undefinedProducts)
            expect(result).toStrictEqual(empty_expected)
        });
    });

    describe("Test filterSearchResults function", () => {
        test("Should filter with minimum price", () => {
            const filterOptions = { minPrice: 6.0}
            const result = filterSearchResults(dbProducts, filterOptions);
            const expected = [
                {
                    id: 4,
                    name: 'Almonds',
                    category: 'Nuts',
                    price: 15.0,
                    description: 'Raw and unsalted almonds',
                    quantity: 150
                },
                {
                    id: 6,
                    name: 'Chicken Breast',
                    category: 'Meat',
                    price: 8.0,
                    description: 'Boneless and skinless chicken breast',
                    quantity: 75
                },
                {
                    id: 7,
                    name: 'Salmon',
                    category: 'Fish',
                    price: 12.0,
                    description: 'Fresh Atlantic salmon fillet',
                    quantity: 50
                },
                {
                    id: 9,
                    name: 'Cheddar Cheese',
                    category: 'Dairy',
                    price: 6.5,
                    description: 'Aged cheddar cheese block',
                    quantity: 80
                },
            ];
            expect(result).toEqual(expected);
        });

        test("Should filter with maximum price", () => {
            const filterOptions = { maxPrice : 3.0 }
            const result = filterSearchResults(dbProducts, filterOptions)
            const expected = [
                {
                    id: 1,
                    name: 'Orange',
                    category: 'Fruit',
                    price: 2.5,
                    description: 'Fresh and juicy oranges',
                    quantity: 509
                },
                {
                    id: 2,
                    name: 'Banana',
                    category: 'Fruit',
                    price: 1.2,
                    description: 'Ripe bananas, perfect for snacking',
                    quantity: 340
                },
                {
                    id: 3,
                    name: 'Broccoli',
                    category: 'Vegetable',
                    price: 3.0,
                    description: 'Fresh green broccoli florets',
                    quantity: 200
                },
                {
                    id: 5,
                    name: 'Milk',
                    category: 'Dairy',
                    price: 1.5,
                    description: 'Organic whole milk',
                    quantity: 120
                },
                {
                    id: 10,
                    name: 'Tomato',
                    category: 'Vegetable',
                    price: 2.8,
                    description: 'Fresh vine-ripened tomatoes',
                    quantity: 300
                }
            ]
            expect(result).toEqual(expected)
        });

        test("Should filter with one category", () => {
            const filterOptions = { category: ["Grain"]}
            const result = filterSearchResults(dbProducts, filterOptions)
            const expected = [
                {
                    id: 8,
                    name: 'Rice',
                    category: 'Grain',
                    price: 4.0,
                    description: 'White basmati rice',
                    quantity: 500
                },
            ]
            expect(result).toEqual(expected)
        });

        test("Should filter with multiple categories", () => {
            const filterOptions = { category: ["Nuts", "Vegetable"]}
            const result = filterSearchResults(dbProducts, filterOptions)
            const expected = [
                {
                    id: 3,
                    name: 'Broccoli',
                    category: 'Vegetable',
                    price: 3.0,
                    description: 'Fresh green broccoli florets',
                    quantity: 200
                },
                {
                    id: 4,
                    name: 'Almonds',
                    category: 'Nuts',
                    price: 15.0,
                    description: 'Raw and unsalted almonds',
                    quantity: 150
                },
                {
                    id: 10,
                    name: 'Tomato',
                    category: 'Vegetable',
                    price: 2.8,
                    description: 'Fresh vine-ripened tomatoes',
                    quantity: 300
                }
            ]

            expect(result).toEqual(expected)
        });

        test("Should filter with multiple filter options", () => {
            const filterOptions = { 
                minPrice: 3.0, 
                maxPrice: 3.0,
                category: "Vegetable"
            };
            const result = filterSearchResults(dbProducts, filterOptions)
            const expected = [
                {
                    id: 3,
                    name: 'Broccoli',
                    category: 'Vegetable',
                    price: 3.0,
                    description: 'Fresh green broccoli florets',
                    quantity: 200
                }
            ]
            expect(result).toEqual(expected)
        });

        test("Should handle when max price is smaller than min price", () => {
            const filterOptions = {
                minPrice : 4.0,
                maxPrice : 2.0
            };
            const result = filterSearchResults(dbProducts, filterOptions)
            expect(result).toEqual(empty_expected)
        });

        test("Should handle with large min price", () => {
            const filterOptions = {
                minPrice : 100000.0
            }
            const result = filterSearchResults(dbProducts, filterOptions)
            expect(result).toEqual(empty_expected)
        });
        
        test("Should handle when max price is negative", () => {
            const filterOptions = {
                maxPrice : -1.0
            }
            const result = filterSearchResults(dbProducts, filterOptions)
            expect(result).toEqual(empty_expected)
        });

        test("Should handle with empty category", () => {
            const filterOptions = {
                category : []
            }
            const result = filterSearchResults(dbProducts, filterOptions)
            const expected = dbProducts
            expect(result).toEqual(expected)
        });

        test("Should handle with all categories selected", () => {
            const filterOptions = {
                category : ["Fruit", "Vegetable", "Nuts", "Dairy", "Meat", "Fish", "Grain"]
            }
            const result = filterSearchResults(dbProducts, filterOptions)
            const expected = dbProducts
            expect(result).toEqual(expected)
        });

        test("Should handle empty filter options", () => {
            const filterOptions = {}
            const result = filterSearchResults(dbProducts, filterOptions);
            const expected = dbProducts

            expect(result).toEqual(expected);
        });

        test("Should handle null filter options", () => {
            const filterOptions = null
            const result = filterSearchResults(dbProducts, filterOptions);
            const expected = dbProducts

            expect(result).toEqual(expected);
        });

        test("Should handle when products are empty array", () => {
            const filterOptions = { minPrice: 6.0}
            const emptyProducts = []
            const result = filterSearchResults(emptyProducts, filterOptions)
            expect(result).toEqual(empty_expected)
        });

        test("Should handle when products are undefined", () => {
            const filterOptions = { minPrice: 6.0}
            const emptyProducts = []
            const result = filterSearchResults(emptyProducts, filterOptions)
            expect(result).toEqual(empty_expected)
        });
    });
});