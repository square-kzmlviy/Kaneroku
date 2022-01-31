import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const categoryRepository = RepositoryFactory.get("category");
interface CategoryData {
    name: string;
    id: number;
}
export function useGetCategories() {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    async function getCategories(isIncome: boolean) {
        try {
            const res = await categoryRepository.get<CategoryData>();
            console.log(res);
            setCategories(res.data.filter((x) => x.is_income === isIncome));
        } catch (error) {
            const { status, message } = error.response;
            console.log(`Error! HTTP Status: ${status} ${error.response}`);
        }
    }
    return { getCategories, categories };
}
