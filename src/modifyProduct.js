import compact from "./compact";
import capitalize from "./capitalize";
import filter from "./filter";
import toNumber from "./toNumber";

export const modifyProduct = (id, product, productsDatabase) => {
    if (typeof id !== "number") {
        return {
            success: false,
            message: "Invalid ID.",
            productsDatabase,
        };
    }
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
    let cloneDatabase = JSON.parse(JSON.stringify(compact(productsDatabase)));
    const existingItems = filter( cloneDatabase, p =>  p.id === id)
    let currentProduct = null;

    if (existingItems.length > 0 && !Array.isArray(existingItems[0])) {
        currentProduct = existingItems[0];
        currentProduct = {
            ...currentProduct,
            ...product,
            name: product.name,
            price: toNumber(product.price)
          };
        cloneDatabase[cloneDatabase.map((p) => p.id).indexOf(id)] = currentProduct;
    } else {
        return {
            success: false,
            message: "Product doesn't exist.",
            productsDatabase,
        };
    }
  
    return {
      success: true,
      message: "Product modified.",
      productsDatabase: cloneDatabase,
    };
  }