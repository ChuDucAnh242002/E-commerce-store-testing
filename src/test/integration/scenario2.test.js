// Add items to cart
// Add selected items to cart
// Response cart data
// Display shopping cart
// Remove items from cart
// Remove selected items from cart
// Response cart data
// Display shopping cart

import { productCart } from "./productCart";
import { checkItem, addItemToCart, interactWithCart } from "../utils/Cart";

describe("Scenario 2: User adds and removes the produce from cart", () => {
    let dbProductCart = JSON.parse(JSON.stringify(productCart))

    beforeEach(() => {
        // Reset product to avoid modification
        dbProductCart = JSON.parse(JSON.stringify(productCart))
    })

    describe("Test checkItem function", () => {
        test("Should check if the item exist in products", () => {
            const itemId = 7
            const itemName = "Salmon"

            const result = checkItem(itemId, itemName)
            const expected = {
                id: 7,
                name: 'Salmon',
                category: 'Fish',
                price: 12.0,
                description: 'Fresh Atlantic salmon fillet',
                quantity: 50
            }
            expect(result).toEqual(expected)
        });

        test("Should check if only provide itemId", () => {
            const itemId = 2
            const itemName = null

            const result = checkItem(itemId, itemName)
            const expected = {
                id: 2,
                name: 'Banana',
                category: 'Fruit',
                price: 1.2,
                description: 'Ripe bananas, perfect for snacking',
                quantity: 340
            }
            expect(result).toEqual(expected)
        })

        test("Should check if only provide itemName", () => {
            const itemId = null
            const itemName = 'Banana'

            const result = checkItem(itemId, itemName)
            const expected = {
                id: 2,
                name: 'Banana',
                category: 'Fruit',
                price: 1.2,
                description: 'Ripe bananas, perfect for snacking',
                quantity: 340
            }
            expect(result).toEqual(expected)
        })

        test("Should handle with null itemId and null itemName", () => {
            const itemId = null
            const itemName = null
            const result = checkItem(itemId, itemName)
            const expected = null
            expect(result).toEqual(expected)
        })
        test("Should handle when provide wrong types", () => {
            const itemId = 'Orange'
            const itemName = 1
            const result = checkItem(itemId, itemName)
            const expected = []
            expect(result).toEqual(expected)
        })
        test("Should handle when itemId and itemName are not from the same item", () => {
            const itemId = 1
            const itemName = 'Banana'
            const result = checkItem(itemId, itemName)
            const expected = []
            expect(result).toEqual(expected)
        })

        test("Should return null when itemId is large", () => {
            const itemId = 100
            const itemName = null
            const result = checkItem(itemId, itemName)
            const expected = []
            expect(result).toEqual(expected)
        })
    });

    describe("Test addItemToCart function", () => {
        test('Should add a new product to an empty cart', () => {
            const selectedProducts = [
                {
                    id: 5,
                    name: 'Milk'
                }
            ]
            const emptyShoppingCart = []
            const updatedCart = addItemToCart(selectedProducts, emptyShoppingCart)
            const expected = [
                {
                    id: 5,
                    name: 'Milk',
                    category: 'Dairy',
                    price: 1.5,
                    description: 'Organic whole milk',
                    quantity: 1
                }
            ]

            expect(updatedCart).toStrictEqual(expected)
        })

        test("Should add item to an existing item", () => {
            const selectedProducts = [
                {
                    id: 1,
                    name: 'Orange'
                }
            ]
            const shoppingCart = dbProductCart
            const updatedCart = addItemToCart(selectedProducts, shoppingCart)
            const expected = [
                {
                    id: 1,
                    name: 'Orange',
                    category: 'Fruit',
                    price: 2.5,
                    description: 'Fresh and juicy oranges',
                    quantity: 3
                },
                {
                    id: 2,
                    name: 'Banana',
                    category: 'Fruit',
                    price: 1.2,
                    description: 'Ripe bananas, perfect for snacking',
                    quantity: 3
                },
                {
                    id: 8,
                    name: 'Rice',
                    category: 'Grain',
                    price: 4.0,
                    description: 'White basmati rice',
                    quantity: 1
                }
            ]
            expect(updatedCart).toEqual(expected)
        })

        test('Should add multiple products to an empty cart', () => {
            const selectedProducts = [
                {
                    id: 4,
                    name: 'Almonds'
                },
                {
                    id: 7,
                    name: 'Salmon'
                },
                {
                    id: 9,
                    name: 'Cheddar Cheese'
                }
            ]
            const emptyShoppingCart = []
            const updatedCart = addItemToCart(selectedProducts, emptyShoppingCart)
            const expected = [
                {
                    id: 4,
                    name: 'Almonds',
                    category: 'Nuts',
                    price: 15.0,
                    description: 'Raw and unsalted almonds',
                    quantity: 1
                },
                {
                    id: 7,
                    name: 'Salmon',
                    category: 'Fish',
                    price: 12.0,
                    description: 'Fresh Atlantic salmon fillet',
                    quantity: 1
                },
                {
                    id: 9,
                    name: 'Cheddar Cheese',
                    category: 'Dairy',
                    price: 6.5,
                    description: 'Aged cheddar cheese block',
                    quantity: 1
                }
            ]
            expect(updatedCart).toEqual(expected)
        });

        test("Should add products with missing name or id to an empty cart", () => {
            const selectedProducts = [
                {
                    id: 6,
                    name: null
                },
                {
                    id: null,
                    name: "Tomato"
                }
            ]
            const emptyShoppingCart = []
            const updatedCart = addItemToCart(selectedProducts, emptyShoppingCart)
            const expected = [
                {
                    id: 6,
                    name: 'Chicken Breast',
                    category: 'Meat',
                    price: 8.0,
                    description: 'Boneless and skinless chicken breast',
                    quantity: 1
                },
                {
                    id: 10,
                    name: 'Tomato',
                    category: 'Vegetable',
                    price: 2.8,
                    description: 'Fresh vine-ripened tomatoes',
                    quantity: 1
                }
            ]
            expect(updatedCart).toEqual(expected)
        });

        test("Should add with additional element to an empty cart", () => {
            const selectedProducts = [
                {
                    id: 1,
                    name: "Orange",
                    width: 98,
                    height: 100
                }
            ]
            const emptyShoppingCart = []
            const updatedCart = addItemToCart(selectedProducts, emptyShoppingCart)
            const expected = [
                {
                    id: 1,
                    name: 'Orange',
                    category: 'Fruit',
                    price: 2.5,
                    description: 'Fresh and juicy oranges',
                    quantity: 1
                }
            ]
            expect(updatedCart).toEqual(expected)
        })

        test("Should throw Type Error when id or name is different type to an empty cart", () => {
            const selectedProducts = [
                {
                    id: "Tomato",
                    name: null
                },
                {
                    id: null,
                    name: 10
                }
            ]
            const emptyShoppingCart = []
            const updatedCart = addItemToCart(selectedProducts, emptyShoppingCart)
            expect(() => updatedCart).toThrow(TypeError)
        })

        test("Should add new item with an existing cart", () => {
            const selectedProducts = [
                {
                    id: 6,
                    name: 'Chicken Breast'
                }
            ]
            const shoppingCart = dbProductCart
            const updatedCart = addItemToCart(selectedProducts, shoppingCart)
            const expected = [
                {
                    id: 1,
                    name: 'Orange',
                    category: 'Fruit',
                    price: 2.5,
                    description: 'Fresh and juicy oranges',
                    quantity: 2
                },
                {
                    id: 2,
                    name: 'Banana',
                    category: 'Fruit',
                    price: 1.2,
                    description: 'Ripe bananas, perfect for snacking',
                    quantity: 3
                },
                {
                    id: 8,
                    name: 'Rice',
                    category: 'Grain',
                    price: 4.0,
                    description: 'White basmati rice',
                    quantity: 1
                },
                {
                    id: 6,
                    name: 'Chicken Breast',
                    category: 'Meat',
                    price: 8.0,
                    description: 'Boneless and skinless chicken breast',
                    quantity: 1
                }
            ]
            expect(updatedCart).toEqual(expected)
        })

        test("Should handle when selected products is null", () => {
            const selectedProducts = null
            const shoppingCart = dbProductCart
            const updatedCart = addItemToCart(selectedProducts, shoppingCart)
            const expected = dbProductCart
            expect(updatedCart).toEqual(expected)
        })

        test("Should add selected product to an empty array when products is not an array", () => {
            const selectedProducts = {id: 3}
            const emptyShoppingCart = []
            const updatedCart = addItemToCart(selectedProducts, emptyShoppingCart)
            const expected = [
                {
                    id: 3,
                    name: 'Broccoli',
                    category: 'Vegetable',
                    price: 3.0,
                    description: 'Fresh green broccoli florets',
                    quantity: 1
                }
            ]
            expect(updatedCart).toEqual(expected)
        })

        test("Should throw Type Error when shopping cart is string", () => {
            const selectedProducts = {id: 3}
            const shoppingCart = "shopping cart"
            expect(() => addItemToCart(selectedProducts, shoppingCart)).toThrow(TypeError)
        })
    });

    describe("Test interactWithCar function", () => {
        test("Should increase quantity of an existing product in an existing cart", () => {
            const shoppingCart = dbProductCart
            const productId = 1
            const quantityChange = 1
            const updatedCart = interactWithCart(shoppingCart, productId, quantityChange)
            const expected = {
                cartItems: [
                    {
                        id: 1,
                        name: 'Orange',
                        category: 'Fruit',
                        price: 2.5,
                        description: 'Fresh and juicy oranges',
                        quantity: 3
                    },
                    {
                        id: 2,
                        name: 'Banana',
                        category: 'Fruit',
                        price: 1.2,
                        description: 'Ripe bananas, perfect for snacking',
                        quantity: 3
                    },
                    {
                        id: 8,
                        name: 'Rice',
                        category: 'Grain',
                        price: 4.0,
                        description: 'White basmati rice',
                        quantity: 1
                    }
                ],
                totalPrice: 2.5 * 3 + 1.2 * 3 + 4.0 * 1
            }
            expect(updatedCart).toEqual(expected)
        })

        test("Should decrease quantity of an existing product in an existing cart", () => {
            const shoppingCart = dbProductCart
            const productId = 2
            const quantityChange = -2
            const updatedCart = interactWithCart(shoppingCart, productId, quantityChange)
            const expected = {
                cartItems: [
                    {
                        id: 1,
                        name: 'Orange',
                        category: 'Fruit',
                        price: 2.5,
                        description: 'Fresh and juicy oranges',
                        quantity: 2
                    },
                    {
                        id: 2,
                        name: 'Banana',
                        category: 'Fruit',
                        price: 1.2,
                        description: 'Ripe bananas, perfect for snacking',
                        quantity: 1
                    },
                    {
                        id: 8,
                        name: 'Rice',
                        category: 'Grain',
                        price: 4.0,
                        description: 'White basmati rice',
                        quantity: 1
                    }
                ],
                totalPrice: 2.5 * 2 + 1.2 * 1 + 4.0 * 1
            }
            expect(updatedCart).toEqual(expected)
        })

        test("Should remove an existing product in an existing cart", () => {
            const shoppingCart = dbProductCart
            const productId = 8
            const quantityChange = -1
            const updatedCart = interactWithCart(shoppingCart, productId, quantityChange)
            const expected = {
                cartItems: [
                    {
                        id: 1,
                        name: 'Orange',
                        category: 'Fruit',
                        price: 2.5,
                        description: 'Fresh and juicy oranges',
                        quantity: 2
                    },
                    {
                        id: 2,
                        name: 'Banana',
                        category: 'Fruit',
                        price: 1.2,
                        description: 'Ripe bananas, perfect for snacking',
                        quantity: 3
                    }
                ],
                totalPrice: 2.5 * 2 + 1.2 * 3
            }
            expect(updatedCart).toEqual(expected)
        })

        test("Should handle with non-existing productId in shopping cart", () => {
            const shoppingCart = dbProductCart
            const productId = 3
            const quantityChange = 2
            const updatedCart = interactWithCart(shoppingCart, productId, quantityChange)
            const expected = {
                cartItems: [
                    {
                        id: 1,
                        name: 'Orange',
                        category: 'Fruit',
                        price: 2.5,
                        description: 'Fresh and juicy oranges',
                        quantity: 2
                    },
                    {
                        id: 2,
                        name: 'Banana',
                        category: 'Fruit',
                        price: 1.2,
                        description: 'Ripe bananas, perfect for snacking',
                        quantity: 3
                    },
                    {
                        id: 8,
                        name: 'Rice',
                        category: 'Grain',
                        price: 4.0,
                        description: 'White basmati rice',
                        quantity: 1
                    }
                ],
                totalPrice: 2.5 * 2 + 1.2 * 3 + 4.0 * 1
            }
            expect(updatedCart).toEqual(expected)
        })

        test("Should throw TypeError when productId is string", () => {
            const shoppingCart = dbProductCart
            const productId = "productId"
            const quantityChange = 10
            expect(() => interactWithCart(shoppingCart, productId, quantityChange)).toThrow(TypeError)
        })

        test("Should handle when shopping cart is empty", () => {
            const emptyShoppingCart = []
            const productId = 1
            const quantityChange = 1
            const updatedCart = interactWithCart(emptyShoppingCart, productId, quantityChange)
            const expected = {"cartItems": [], "totalPrice": 0}
            expect(updatedCart).toEqual(expected)
        })

        test("Should throw TypeError when shopping cart is null", () => {
            const shoppingCart = null
            const productId = 1
            const quantityChange = 1
            expect(() => interactWithCart(shoppingCart, productId, quantityChange)).toThrow(TypeError)
        })
    })
});