import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BalanceInput from "../../components/modal/BalanceInput";
export default function Home() {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    return (
        <div>
            <Header />
            <BalanceInput open={open} onClose={handleClose} />
            <Footer handleClickOpen={handleClickOpen} />

            {/* <UserInputForm /> */}
        </div>
    );
}
