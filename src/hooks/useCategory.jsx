import { useEffect, useState } from "react";
import { getAllCategories } from "../apis/fakeStoreProdApi";
import axios from "axios";

function useCategory(){
    const [categories, setCategories] = useState([]);

    async function downloadCategories(){
    try {
        const response = await axios.get(getAllCategories());
        setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
        console.log("Failed to fetch categories:", error);
        setCategories([]);
    }

}
    
    useEffect(() => {
        downloadCategories();
    }, []);
    return [categories];
}
export default useCategory;