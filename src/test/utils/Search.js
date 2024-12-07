import filter from "../../filter"
import words from "../../words"

// User browse the product by category
const browseProductCategory = (products, browseCategory) => {
    const filteredProducts = filter(products, ({ category }) => category === browseCategory)
    return filteredProducts
}

// User search the product by key
const searchProduct = (products, searchKey) => {
    const filteredProducts = filter(products, (product) => 
        words(product.name).includes(searchKey?.toLowerCase()) || words(product.description).includes(searchKey?.toLowerCase())
    );
    return filteredProducts
}

// User filter the search result
const filterSearchResults = (products, filterOptions) => {
    let filteredProducts = products;

    // Filtering by min price using filter function
    if(filterOptions?.minPrice !== undefined) {
        filteredProducts = filter(filteredProducts, 
            ({ price }) => price >= filterOptions.minPrice
        )
    }

    // Filtering by max price using filter function
    if(filterOptions?.maxPrice !== undefined) {
        filteredProducts = filter(filteredProducts, 
            ({price}) => price <= filterOptions.maxPrice
        )
    }

    // Filtering by category using filter function
    if(filterOptions?.category !== undefined) {
        if(filterOptions.category.length != 0){
            filteredProducts = filter(filteredProducts,
                ({ category }) => filterOptions.category.includes(category)
            );
        }
    }

    return filteredProducts
}

export { browseProductCategory, searchProduct, filterSearchResults };