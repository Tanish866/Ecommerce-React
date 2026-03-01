export function getAllCategories(){
    return `https://fakestoreapi.com/products/categories`;
}

export function getAllProduct(){
    return `https://fakestoreapi.com/products`;
}

export function getProductByCategory(category){
    return `https://fakestoreapi.com/products/category/${category}`;
}

export function getProduct(id){
    return `https://fakestoreapi.com/products/${id}`;
}