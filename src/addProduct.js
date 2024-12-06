import filter from "./filter";
import toNumber from "./toNumber";

export const addProduct = (product, productsDatabase) => {
    if (!product || typeof product !== 'object'){
      return {
        success: false,
        message: "Invalid product data.",
        productsDatabase,
      };
    }
    if (!product.name || !product.category || !product.price || !product.quantity || !product.description) {
      return {
        success: false,
        message: "Required fields cannot be empty.",
        productsDatabase,
      };
    }
    // Check same product existed, if yes then add quantity, if no then add new
    const existingItems = filter( productsDatabase, p => p.name === product.name && p.category === product.category && p.price === product.price && p.description === product.description)
    let currentProduct = null;
    if (existingItems.length > 0 && !Array.isArray(existingItems[0])) {
        return {
          success: false,
          message: "Product existed.",
          productsDatabase,
        };
    } else {
        const { name, price, ...other } = product;
        currentProduct = {
            ...other,
            name: name,
            price: toNumber(price),
            quantity: product.quantity,
            id: productsDatabase.length+1
          };
          productsDatabase.push(currentProduct);
    }
  
    return {
      success: true,
      message: "Product added.",
      productsDatabase
    };
  }