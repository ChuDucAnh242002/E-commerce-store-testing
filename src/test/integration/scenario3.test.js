// Confirm payment & fill payment information
// Validate payment information
// Response payment confirmation
// Display payment confirmed

import { checkout, makePayment, confirmOrderPlacement } from '../utils/Checkout';
import { productCart } from './productCart';

describe("Scenario 3: User purchase product (checkout)", () => {
    let dbProductCart = JSON.parse(JSON.stringify(productCart));

    beforeEach(() => {
        // Reset product to avoid modification
        dbProductCart = JSON.parse(JSON.stringify(productCart));
    })

    const fullPaymentInfo = { cardNumber: '1234 5678 9101 1121', expiry: '12/23', cvv: '123', phoneNum: '+1234567890' }

    describe("Test checkout function", () => {
        test("Should handle when shopping cart is empty and return price 0", () => {
            const emptyShoppingCart = []
            const orderConfirmation = checkout(emptyShoppingCart, fullPaymentInfo)
            const expected = {
                cartItems: [],
                totalPrice: 0,
                paymentInfo: fullPaymentInfo
            }
            expect(orderConfirmation).toEqual(expected)
        })

        test("Should calculate the price with existing cart", () => {
            const shoppingCart = dbProductCart
            const orderConfirmation = checkout(shoppingCart, fullPaymentInfo)
            const expected = {
                cartItems: shoppingCart,
                totalPrice: 12.6,
                paymentInfo: fullPaymentInfo
            }
            expect(orderConfirmation).toEqual(expected)
        })

        test("Should calculate the total price without paymentInfo", () => {
            const shoppingCart = dbProductCart
            const emptyPaymentInfo = {}
            const orderConfirmation = checkout(shoppingCart, emptyPaymentInfo)
            const expected = {
                cartItems: shoppingCart,
                totalPrice: 12.6,
                paymentInfo: emptyPaymentInfo
            }
            expect(orderConfirmation).toEqual(expected)
        })

        test("Should handle with invalid payment information", () => {
            const shoppingCart = dbProductCart
            const invalidPaymentInfo = { cardNumber: 'invalid', expiry:'invalid', cvv: 'invalid'}
            const orderConfirmation = checkout(shoppingCart, invalidPaymentInfo)
            const expected = {
                cartItems: shoppingCart,
                totalPrice: 12.6,
                paymentInfo: invalidPaymentInfo
            }
            expect(orderConfirmation).toEqual(expected)
        })

        test("Should handle with invalid shoppingCart", () => {
            const invalidShoppingCart = [{ id: 'invalid', name:'invalid', quantity: 'invalid'}]
            const orderConfirmation = checkout(invalidShoppingCart, fullPaymentInfo)
            const expected = {
                cartItems: invalidShoppingCart,
                totalPrice: NaN,
                paymentInfo: fullPaymentInfo
            }
            expect(orderConfirmation).toEqual(expected)
        })

        test("Should throw TypeError when shopping cart is a string", () => {
            const shoppingCart = "shopping cart"
            const orderConfirmation = () => checkout(shoppingCart, fullPaymentInfo)
            expect(orderConfirmation).toThrow(TypeError)
        })

        test("Should throw TypeError when paymentInfo is an integer", () => {
            const shoppingCart = dbProductCart
            const paymentInfo = 1234
            const orderConfirmation = () =>  checkout(shoppingCart, paymentInfo)
            expect(orderConfirmation).toThrow(TypeError)
        })
    })

    describe("Test makePayment function", () => {
        test("Should return a transaction record and an order confirmation", () => {
            const { transactionRecord, orderConfirmation } = makePayment(fullPaymentInfo, '12.0 EUR')
            
            const expectedTransactionRecord = {
                amount: 12.0,
                currency: 'EUR',
                status: 'successful',
                timestamp: new Date().toUTCString(),
                paymentInfo: fullPaymentInfo
            }
            const expectedOrderConfirmation = {
                message: "Your payment of 12 EUR was successful.",
                itemsPaidFor: ["12.0"],
                contactMethod: 'SMS',
                contactAddress: fullPaymentInfo.phoneNum
            }
            expect(transactionRecord).toEqual(expectedTransactionRecord)
            expect(orderConfirmation).toEqual(expectedOrderConfirmation)
        })

        test("Should handle when paymentInfo is null", () => {
            const nullPaymentInfo = null
            const { transactionRecord, orderConfirmation } = makePayment(nullPaymentInfo, '12.0 EUR')
            const expectedTransactionRecord = {
                amount: 12,
                currency: 'EUR',
                status: 'unsuccessful',
                timestamp: new Date().toUTCString(),
            }
            const expectedOrderConfirmation = {}
            expect(transactionRecord).toEqual(expectedTransactionRecord)
            expect(orderConfirmation).toEqual(expectedOrderConfirmation)
        })

        test("Should throw TypeError when payment amount is null", () => {
            const nullPaymentAmount = null

            expect(() => makePayment(fullPaymentInfo, nullPaymentAmount)).toThrow(TypeError)

        })

        test("Should throw TypeError when both payment info and payment amount are null", () => {
            const nullPaymentInfo = null
            const nullPaymentAmount = null
            expect(() => makePayment(nullPaymentInfo, nullPaymentAmount)).toThrow(TypeError)
        })

        test("Should handle when payment amount doens't contain number", () => {
            const paymentAmount = "EUR"
            const { transactionRecord, orderConfirmation } = makePayment(fullPaymentInfo, paymentAmount)
            const expectedTransactionRecord = {
                status: 'unsuccessful',
                timestamp: new Date().toUTCString(),
            }
            const expectedOrderConfirmation = {
                message: "Your payment was unsuccessful",
                itemsPaidFor: [[]],
                contactMethod: 'SMS',
                contactAddress: fullPaymentInfo.phoneNum
            }
            expect(transactionRecord).toEqual(expectedTransactionRecord)
            expect(orderConfirmation).toEqual(expectedOrderConfirmation)
        })

        test("Should handle when payment information is invalid", () => {
            const invalidPaymentInfo = { cardNumber: 'invalid', expiry:'invalid', cvv: 'invalid'}
            const { transactionRecord, orderConfirmation } = makePayment(invalidPaymentInfo, '12.0 EUR')
            const expectedTransactionRecord = {
                amount: 12.0,
                currency: 'EUR',
                status: 'unsuccessful',
                timestamp: new Date().toUTCString(),
            }
            const expectedOrderConfirmation = {}
            expect(transactionRecord).toEqual(expectedTransactionRecord)
            expect(orderConfirmation).toEqual(expectedOrderConfirmation)
        })

        test("Should make sucessful payment with large payment amount", () => {
            const { transactionRecord, orderConfirmation } = makePayment(fullPaymentInfo, '100000000.0 EUR')
            const expectedTransactionRecord = {
                amount: 100000000.0,
                currency: 'EUR',
                status: 'successful',
                timestamp: new Date().toUTCString(),
                paymentInfo: fullPaymentInfo
            }
            const expectedOrderConfirmation = {
                message: "Your payment of 100000000 EUR was successful.",
                itemsPaidFor: ["100000000.0"],
                contactMethod: 'SMS',
                contactAddress: fullPaymentInfo.phoneNum
            }
            expect(transactionRecord).toEqual(expectedTransactionRecord)
            expect(orderConfirmation).toEqual(expectedOrderConfirmation)
        })

        test("Should handle with negative payment amount", () => {
            const { transactionRecord, orderConfirmation } = makePayment(fullPaymentInfo, '-10.0 EUR')

            const expectedTransactionRecord = {
                status: 'unsuccessful',
                timestamp: new Date().toUTCString(),
            }
            const expectedOrderConfirmation = {
                message: "Your payment was unsuccessful",
                itemsPaidFor: [[]],
                contactMethod: 'SMS',
                contactAddress: fullPaymentInfo.phoneNum
            }

            expect(transactionRecord).toEqual(expectedTransactionRecord)
            expect(orderConfirmation).toEqual(expectedOrderConfirmation)
        })
    })

    describe("Test confirmOrderPlacement function", () => {
        test("Should return confimration detail", () => {
            const shoppingCart = dbProductCart
            const confirmationDetails = confirmOrderPlacement(shoppingCart, fullPaymentInfo)
            const expected = {
                confirmationMessage: 'Your order has been successfully placed!',
                contactMethod: 'SMS',
                contactAddress: '+1234567890',
                paymentStatus: 'Payment successful',
                orderedItems: ['Orange', 'Banana', 'Rice'],
            }
            expect(confirmationDetails).toEqual(expected)
        })

        test("Should handle with empty shopping cart", () => {
            const emptyShoppingCart = []
            const confirmationDetails = confirmOrderPlacement(emptyShoppingCart, fullPaymentInfo)
            const expected = {
                confirmationMessage: 'Your order has been unsuccessfully placed!',
                contactMethod: 'SMS',
                contactAddress: '+1234567890',
                paymentStatus: 'Payment unsuccessful',
                orderedItems: [],
            }
            expect(confirmationDetails).toEqual(expected)
        })

        test("Should handle with null payment information", () => {
            const nullPaymentInfo = null
            const shoppingCart = dbProductCart
            const confirmationDetails = confirmOrderPlacement(shoppingCart, nullPaymentInfo)
            const expected = {
                confirmationMessage: 'Your order has been unsuccessfully placed!',
                contactMethod: 'SMS',
                contactAddress: undefined,
                paymentStatus: 'Payment unsuccessful',
                orderedItems: ['Orange', 'Banana', 'Rice'],
            }
            expect(confirmationDetails).toEqual(expected)
        })

        test("Should throw TypeError when payment information is an integer", () => {
            const shoppingCart = dbProductCart
            const confirmationDetails = () => confirmOrderPlacement(shoppingCart, 12)
            expect(confirmationDetails).toThrow(TypeError)
        })
    })
});