import { login } from '../../functionalities/login';
import { modifyProduct } from "../../functionalities/ModifyProduct";
import { showProductNotification } from '../../functionalities/ShowProductNotification';
import {products} from './db/products';
import {credentials} from './db/credentials';
import ceil from '../../ceil';
// Even though the functionalities are relatively the same to scenarios 4
// each scenario is a different process going through the system, therefore, even tested same way, the result may differ

describe('scenario5', () => {
    let dbProducts = JSON.parse(JSON.stringify(products));
    let dbCredentials = JSON.parse(JSON.stringify(credentials));
    let randomProduct = {};
    beforeEach(()=>{
        // reset product to avoid modification
        dbProducts = JSON.parse(JSON.stringify(products));
        dbCredentials = JSON.parse(JSON.stringify(credentials));
        randomProduct = dbProducts[ceil(Math.random() * 10)];
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

    describe('Test modify product', () => {
        test('Modify product with valid product and id', () => {
            const newProduct = {
                name: 'test',
                category: 'test',
                price: 10,
                quantity: 10
            }
            const { success, message, dbProducts } = modifyProduct(randomProduct.id, newProduct, dbProducts);
            expect(success).toBe(true);
            expect(message).toBe('Product modified.');
            const productFromDB = filter( dbProducts, p => p.name === newProduct.name && p.category === newProduct.category && p.price === newProduct.price && p.id == randomProduct.id)
            expect(productFromDB.length).toBe(1);
        });

        describe('Modify invalid product', () => {
            test('Product without name', () => {
                delete randomProduct.name
                const result = modifyProduct(randomProduct.id, randomProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.dbProducts).toEqual(dbProducts);
            })

            test('Product without description', () => {
                delete randomProduct.description
                const result = modifyProduct(randomProduct.id, randomProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.dbProducts).toEqual(dbProducts);
            })

            test('Product without category', () => {
                delete randomProduct.category
                const result = modifyProduct(randomProduct.id, randomProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.dbProducts).toEqual(dbProducts);
            })

            test('Product without price', () => {
                delete randomProduct.price;
                const result = modifyProduct(randomProduct.id, randomProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.dbProducts).toEqual(dbProducts);
            })

            test('Product without quantity', () => {
                delete randomProduct.quantity;
                const result = modifyProduct(randomProduct.id, randomProduct, dbProducts);
                expect(result.success).toBe(false);
                expect(result.message).toBe('Missing required fields.');
                expect(result.dbProducts.length).toBe(products.length);
            })

            test('Product with different dataType', () => {
                const nullResult = modifyProduct(randomProduct.id, null, dbProducts);
                expect(nullResult.success).toBe(false);
                expect(nullResult.message).toBe('Missing required fields.');
                expect(nullResult.dbProducts.length).toBe(products.length);
                const undefinedResult = modifyProduct(randomProduct.id, undefined, dbProducts);
                expect(undefinedResult.success).toBe(false);
                expect(undefinedResult.message).toBe('Missing required fields.');
                expect(undefinedResult.dbProducts.length).toBe(products.length);
                const emptyStringResult = modifyProduct(randomProduct.id, '', dbProducts);
                expect(emptyStringResult.success).toBe(false);
                expect(emptyStringResult.message).toBe('Missing required fields.');
                expect(emptyStringResult.dbProducts.length).toBe(products.length);
            })
        })


    })

    describe('validate product data', () => {
        test('Product without name', () => {
            delete randomProduct.name
            const result = validateProduct(randomProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Required fields cannot be empty.');
        })

        test('Product without description', () => {
            delete randomProduct.description
            const result = validateProduct(randomProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Required fields cannot be empty.');
        })

        test('Product without category', () => {
            delete randomProduct.category
            const result = validateProduct(randomProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Missing required fields.');
        })

        test('Product without price', () => {
            delete randomProduct.price;
            const result = validateProduct(randomProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Missing required fields.');
        })

        test('Product without quantity', () => {
            delete randomProduct.quantity;
            const result = validateProduct(randomProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Missing required fields.');
        })

        test('Product with negative price', () => {
            randomProduct.price = -1000;
            const result = validateProduct(randomProduct);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Price need to be a number greater than 0.');
        })

        test('Valid product', () => {
            const result = validateProduct(randomProduct);
            expect(result.valid).toBe(true);
            expect(result.message).toBe('Product information is valid.');
        })
    })

    describe('return request', () => {
        test('Invalid product', () => {
            randomProduct.price = -1000;
            const result = returnRequest(randomProduct, 'modified');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid product data.');
        })

        test('Valid product', () => {
            const result = returnRequest(randomProduct, 'modified');
            expect(result.success).toBe(true);
            expect(result.message).toBe('Product modified to the database.');
        })
    })

    describe('Show product information after modified', () => {

        beforeAll(() => {
            global.alert = jest.fn();
        });

        test('Correct product', () => {
            const productDetails = dbProducts[0]
            showProductNotification(productDetails, 'modified');
            expect(global.alert).toHaveBeenCalledWith('Congratulations, Orange is successfully modified.');
        })

        test('Product without name', () => {
            const productDetails = dbProducts[0]
            delete productDetails.name
            showProductNotification(productDetails, 'modified');
            expect(global.alert).toHaveBeenCalledWith('Congratulations, New Product is successfully modified.');
        })
    })
})