import { login } from '../../functionalities/login';
import { addProduct } from '../../functionalities/addProduct';
import { showProductNotification } from '../../functionalities/ShowProductNotification';
import { validateProduct, returnRequest } from '../../functionalities/validateProduct';
import {products} from './db/products';
import {credentials} from './db/credentials';

describe('Scenario 4 tests', () => {
    let dbProducts = JSON.parse(JSON.stringify(products));
    let dbCredentials = JSON.parse(JSON.stringify(credentials));

    beforeEach(()=>{
        // reset product to avoid modification
        dbProducts = JSON.parse(JSON.stringify(products));
        dbCredentials = JSON.parse(JSON.stringify(credentials));
    })

    describe('producerLogin', () => {
        test('Login with valid credentials', () => {
            dbCredentials.forEach(({ email, password }) => {
                const { success, message } = login(email, password, dbCredentials);
                expect(success).toBe(true);
                expect(message).toBe('Login success');
                });
        })

        describe('Authentication with invalid credentials', () => {
        
            test('null email and null password', () => {
                const { success, message } = login(null, null, dbCredentials);
                expect(success).toBe(false);
                expect(message).toBe('Invalid credentials');
            });
        
            test('undefined email and undefined password', () => {
                const { success, message } = login(undefined, undefined, dbCredentials);
                expect(success).toBe(false);
                expect(message).toBe('Invalid credentials');
            });
        
            test('null email and undefined password', () => {
                const { success, message } = login(null, undefined, dbCredentials);
                expect(success).toBe(false);
                expect(message).toBe('Invalid credentials');
            });
        
            test('undefined email and null password', () => {
                const { success, message } = login(undefined, null, dbCredentials);
                expect(success).toBe(false);
                expect(message).toBe('Invalid credentials');
            });
        
            test('empty string email and empty string password', () => {
                const { success, message } = login('', '', dbCredentials);
                expect(success).toBe(false);
                expect(message).toBe('Invalid credentials');
            });
        
            test('valid email and invalid password', () => {
                const validEmail = credentials[0].email;
                const { success, message } = login(validEmail, 'invalid password', dbCredentials);
                expect(success).toBe(false);
                expect(message).toBe('Invalid credentials');
            });
        });
    })

    describe('Producer add new product', () => {
        let anProduct = {}

        beforeEach(() => {
            anProduct = {       
                name: 'Product An',
                description: 'an',
                category: 'Fruit',
                price: 1.5,
                quantity: 10,
            }
        })

        test('Add valid product', () => {
            const result = addProduct(anProduct, dbProducts);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Product added.');
            expect(result.productsDatabase.length).toBe(products.length +1);

            const addedProduct = result.productsDatabase[result.productsDatabase.length - 1];
            expect(addedProduct.name).toBe(anProduct.name);
            expect(addedProduct.description).toBe(anProduct.description);
            expect(addedProduct.category).toEqual(anProduct.category);
            expect(addedProduct.price).toBe(anProduct.price);
            expect(addedProduct.quantity).toBe(anProduct.quantity);
        })

        describe('Add invalid product', () => {
            test('Product without name', () => {
                delete anProduct.name
                const result = addProduct(anProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.productsDatabase).toEqual(dbProducts);
            })

            test('Product without description', () => {
                delete anProduct.description
                const result = addProduct(anProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.productsDatabase).toEqual(dbProducts);
            })

            test('Product without category', () => {
                delete anProduct.category
                const result = addProduct(anProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.productsDatabase).toEqual(dbProducts);
            })

            test('Product without price', () => {
                delete anProduct.price;
                const result = addProduct(anProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.productsDatabase).toEqual(dbProducts);
            })

            test('Product without quantity', () => {
                delete anProduct.quantity;
                const result = addProduct(anProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.productsDatabase.length).toBe(products.length);
            })

            test('Product with different dataType', () => {
                const nullResult = addProduct(null, dbProducts);
                expect(nullResult.success).toBe(false);
                expect(nullResult.message).toBe('Missing required fields.');
                expect(nullResult.productsDatabase.length).toBe(products.length);
                const undefinedResult = addProduct(undefined, dbProducts);
                expect(undefinedResult.success).toBe(false);
                expect(undefinedResult.message).toBe('Missing required fields.');
                expect(undefinedResult.productsDatabase.length).toBe(products.length);
                const emptyStringResult = addProduct('',dbProducts)
                expect(emptyStringResult.success).toBe(false);
                expect(emptyStringResult.message).toBe('Missing required fields.');
                expect(emptyStringResult.productsDatabase.length).toBe(products.length);
            })
        })

        describe('Add existing product', () => {
            // A product is considered new when there is no existing name & category & price information
            test('First product in database', () => {
                const firstProduct = dbProducts[0];
                const result = addProduct(firstProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Product existed.');
                expect(result.productsDatabase.length).toBe(products.length);
            })

            test('Product with mix name and category and price information', () => {
                const existingProduct = { name: dbProducts[0].name, category: bProducts[1].category, price: bProducts[2].price };
                const result = addProduct(existingProduct, dbProducts);
                expect(result.success).toBe(true);
                expect(result.message).toBe('Product added.');
                expect(result.productsDatabase.length).toBe(products.length+1);
            })
        })
    })

    describe('validate product data', () => {
        test('Product without name', () => {
            delete anProduct.name
            const result = validateProduct(anProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Required fields cannot be empty.');
        })

        test('Product without description', () => {
            delete anProduct.description
            const result = validateProduct(anProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Required fields cannot be empty.');
        })

        test('Product without category', () => {
            delete anProduct.category
            const result = validateProduct(anProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Missing required fields.');
        })

        test('Product without price', () => {
            delete anProduct.price;
            const result = validateProduct(anProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Missing required fields.');
        })

        test('Product without quantity', () => {
            delete anProduct.quantity;
            const result = validateProduct(anProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Missing required fields.');
        })

        test('Product with negative price', () => {
            anProduct.price = -1000;
            const result = validateProduct(anProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Price need to be a number greater than 0.');
        })

        test('Valid product', () => {
            const result = validateProduct(anProduct);
            expect(result.valid).toBe(true);
            expect(result.message).toBe('Product information is valid.');
        })
    })

    describe('return request', () => {
        test('Invalid product', () => {
            anProduct.price = -1000;
            const result = returnRequest(anProduct, 'add');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid product data.');
        })

        test('Valid product', () => {
            const result = returnRequest(anProduct, 'add');
            expect(result.success).toBe(true);
            expect(result.message).toBe('Product add to the database.');
        })
    })

    describe('Show product information after added', () => {

        beforeAll(() => {
            global.alert = jest.fn(); // Mock alert globally
        });

        test('Correct product', () => {
            const productDetails = dbProducts[0]
            showProductNotification(productDetails, 'added');
            expect(global.alert).toHaveBeenCalledWith('Congratulations, Orange is successfully added.');
        })

        test('Product without name', () => {
            const productDetails = dbProducts[0]
            delete productDetails.name
            showProductNotification(productDetails, 'added');
            expect(global.alert).toHaveBeenCalledWith('Congratulations, New Product is successfully added.');
        })
    })
})