import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const categoryIconRepository = RepositoryFactory.get("category_icon");
interface CategoryIconData {
    img_path: string;
    id: number;
}
export function useGetCategoryIcons() {
    const [categoryIcons, setCategoryIcons] = useState<CategoryIconData[]>([]);
    async function getCategoryIcons() {
        try {
            const res = await categoryIconRepository.get<CategoryIconData>();
            console.log(res);
            setCategoryIcons(res.data);
        } catch (error) {
            const { status, message } = error.response;
            console.log(`Error! HTTP Status: ${status} ${error.response}`);
        }
    }
    return { getCategoryIcons, categoryIcons };
}
