import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const balanceRepository = RepositoryFactory.get("balance");
interface BalanceyData {
    name: string;
    id: number;
    value: number;
    date: string;
    img_path: string;
}
export function useGetBalance() {
    const [balance, setBalance] = useState<BalanceyData[]>([]);
    async function getBalance() {
        try {
            const res = await balanceRepository.get<BalanceyData>();
            console.log(res);
            setBalance(res.data);
        } catch (error) {
            const { status, message } = error.response;
            console.log(`Error! HTTP Status: ${status} ${error.response}`);
        }
    }
    return { getBalance, balance };
}
