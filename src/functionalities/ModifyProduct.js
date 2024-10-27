import compact from "../compact";
import capitalize from "../capitalize";
import filter from "../filter";
import parseFloat from "../parseFloat";

// This function include product modify, addition, deletion
export const modifyProduct = (product, productsDatabase) => {
    if (!product.name || !product.category || !product.price) {
      return {
        success: false,
        message: "Missing required fields.",
        productsDatabase,
      };
    }
    let cloneDatabase = JSON.parse(JSON.stringify(compact(productsDatabase)));
    // Check same product existed, if yes then add quantity, if no then add new
    const existingItems = filter( cloneDatabase, p => p.name === product.name && p.category === product.category && p.price === product.price)
    let currentProduct = null;
    if (existingItems.length > 0) {
        currentProduct = existingItems[existingItems.length - 1];
        const quantity = add(existingItems[existingItems.length - 1].quantity, product.quantity || 1)
        currentProduct.quantity = quantity >= 0 ? quantity : 0;
    } else {
        const { name, price, ...other } = product;
        currentProduct = {
            ...other,
            name: capitalize(name),
            price: parseFloat(price),
            quantity: product.quantity > 0 ? product.quantity : 1,
            id: cloneDatabase.length
          };
        cloneDatabase.push(currentProduct);
    }
  
    return {
      success: true,
      message: "Product modified.",
      productsDatabase,
    };
  }