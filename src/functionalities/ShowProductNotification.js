import get from "../get";

export const showProductNotification = (productDetails, status) => {
    const productName = get(productDetails, "name", "New Product");
    const message = `Congratulations, ${productName} is successfully ${status}`;
    alert(message);
}