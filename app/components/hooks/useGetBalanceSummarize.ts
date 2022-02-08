import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";

const balanceSummarizeRepository = RepositoryFactory.get("balance_summarize");
interface BalanceSummarizeData {
    daily_total: number;
    week_history: [number];
    week_dates: [number];
}
const initialCategoryData: BalanceSummarizeData = {
    daily_total: 0,
    week_history: [0],
    week_dates: [0],
};
export function useGetBalanceSummarize() {
    const [balanceSummarize, setBalanceSummarize] =
        useState<BalanceSummarizeData>(initialCategoryData);
    async function getBalanceSummarize() {
        try {
            const res =
                await balanceSummarizeRepository.get<BalanceSummarizeData>();
            console.log(res);
            setBalanceSummarize(res.data);
            return res.data;
        } catch (error) {
            const { status, message } = error.response;
            console.log(`Error! HTTP Status: ${status} ${error.response}`);
        }
    }
    return { getBalanceSummarize, balanceSummarize };
}
