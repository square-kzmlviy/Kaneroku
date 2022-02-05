import React, { useState, useEffect, useLayoutEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BalanceInput from "../../components/modal/BalanceInput";
import BalanceConteiner from "../../components/balance/BalanceContainer";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const balanceRepository = RepositoryFactory.get("balance");
import { useGetBalance } from "../../components/hooks/useGetBalance";
import Router from "next/router";
import { useGetLogInUser } from "../../components/hooks/useGetLogInUser";
export default function Home() {
    const [open, setOpen] = React.useState(false);
    const { getBalance, balance } = useGetBalance();

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    useLayoutEffect(() => {
        getBalance();
    }, []);
    return (
        <div>
            <Header />
            <BalanceInput
                open={open}
                onClose={handleClose}
                getBalance={getBalance}
            />
            <BalanceConteiner balance_data={balance} />
            <Footer handleClickOpen={handleClickOpen} />

            {/* <UserInputForm /> */}
        </div>
    );
}
