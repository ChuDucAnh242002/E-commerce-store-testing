// Return correct request to frontend by validating product
export const returnRequest = (productData) => {
    if (validateProduct(productData).valid) {
      return { success: true, message: "Product added to the database." };
    }
    return { success: false, message: "Invalid product data." };
  }
  

// Validate product with different requirements
export const validateProduct = (product) => {
    const { name, description, category, price } = product;
    if (!name || !description || !category || !price) {
        return { valid: false, message: "Required fields cannot be empty." };
    }
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
        return {
        valid: false,
        message: "Price need to be a number greater than 0.",
        };
    }

    return { valid: true, message: "Product information is valid." };
}