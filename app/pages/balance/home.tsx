import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BalanceInput from "../../components/modal/BalanceInput";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const balanceRepository = RepositoryFactory.get("balance");
import { useGetBalance } from "../../components/hooks/useGetBalance";
export default function Home() {
    const [open, setOpen] = React.useState(false);
    const { getBalance, balance } = useGetBalance();

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    useEffect(() => {
        getBalance();
    }, []);
    return (
        <div>
            <Header />
            <BalanceInput open={open} onClose={handleClose} />
            {balance.map((data) => {
                return (
                    <div>
                        {data.name}
                        {data.value}
                        {data.date}
                        <img
                            width="10%"
                            src={
                                data.img_path
                                    ? `/static/${data.img_path}.svg`
                                    : `/static/category_icon_0.svg`
                            }
                        />
                    </div>
                );
            })}
            <Footer handleClickOpen={handleClickOpen} />

            {/* <UserInputForm /> */}
        </div>
    );
}
