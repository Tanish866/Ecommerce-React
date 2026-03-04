export function getAllCategories(){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/categories`;
}

export function getAllProduct(){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products`;
}

export function getProductByCategory(category){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/category/${category}`;
}

export function getProduct(id){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/${id}`;
}

export function signup(){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/users`;
}

export function signin(){
    return `${import.meta.env.VITE_FAKE_STORE_URL}/auth/login`;
}