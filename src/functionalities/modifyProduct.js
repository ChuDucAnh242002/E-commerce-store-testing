import compact from "../compact";
import capitalize from "../capitalize";
import filter from "../filter";
import parseFloat from "../parseFloat";

export const modifyProduct = (id, product, productsDatabase) => {
    if (typeof id !== "number") {
        return {
            success: false,
            message: "Invalid ID.",
            productsDatabase,
        };
    }
    if (!product.name || !product.category || !product.price) {
      return {
        success: false,
        message: "Missing required fields.",
        productsDatabase,
      };
    }
    let cloneDatabase = JSON.parse(JSON.stringify(compact(productsDatabase)));
    const existingItems = filter( cloneDatabase, p => p.id === id)
    let currentProduct = null;
    if (product.quantity && product.quantity <= 0) {
        return {
            success: false,
            message: "Quantity must be greater than 0.",
            productsDatabase,
        };
    }
    if (existingItems.length > 0) {
        currentProduct = existingItems[0];
        currentProduct = {
            ...currentProduct,
            ...product,
            name: capitalize(product.name),
            price: parseFloat(product.price)
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
      productsDatabase,
    };
  }