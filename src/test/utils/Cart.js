import castArray from '../../castArray'
import add from '../../add'
import get from '../../get'
import filter from '../../filter'
import map from '../../map'
import reduce from '../../reduce'
import keys from '../../keys'

import { products } from '../integration/products'

// Check if items in products array
const checkItem = (productId, productName) => {
    
    if (!productId && !productName){
        return null
    }

    let filteredProducts = filter(products, (product) => {
        if(product.id === productId && !productName){
            return product
        } 
        else if(product.name === productName && !productId){
            return product
        }
        else if(product.id === productId && product.name === productName){
            return product
        }
    })

    let filteredProduct = filteredProducts[0]
    return filteredProduct
}

// Add only one item at a time
const addItemToCart = (selectedProducts, shoppingCart) => {
    // Cast the selected products to an array
    const productsToAdd = castArray(selectedProducts);
    shoppingCart = castArray(shoppingCart)
    
    productsToAdd.forEach((product) => {
        const productId = get(product, 'id', null)
        const productName = get(product, 'name', null)

        let filteredProduct = checkItem(productId, productName)

        if(!filteredProduct){
            return shoppingCart
        }
        
        const existingItem = filter(shoppingCart, item => item.id === productId)
        if(existingItem.length !== 0 && keys(existingItem[0]).includes('quantity')) {
            shoppingCart = map(shoppingCart, (item) => {
                if (item.id === productId){
                    item.quantity = add(item.quantity, 1)
                }
                return item
            })
        }
        else {
            
            // Add only 1 item to the cart
            filteredProduct.quantity = 1
            shoppingCart.push(filteredProduct);
        }

        shoppingCart = shoppingCart.filter(item => keys(item).length !== 0)
        
    });

    return shoppingCart
}

const interactWithCart = (shoppingCart, productId, quantityChange) => {
    const cartItemIndex = shoppingCart.findIndex((item) => item.id === productId)

    if(cartItemIndex !== -1) {
        shoppingCart[cartItemIndex].quantity = add(
            shoppingCart[cartItemIndex].quantity,
            quantityChange
        );

        if(shoppingCart[cartItemIndex].quantity <= 0){
            shoppingCart.splice(cartItemIndex, 1);
        }
    }

    const totalPrice = reduce(
        shoppingCart,
        (acc, item) => add(acc, item.price * item.quantity),
        0
    );

    return {
        cartItems: shoppingCart,
        totalPrice: totalPrice
    };
}

export { checkItem ,addItemToCart, interactWithCart };