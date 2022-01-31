import React, { useState, useEffect } from "react";
import { useGetLogInUser } from "../hooks/useGetLogInUser";
import style from "../../styles/header.module.css";
import BalanceColumn from "./BalanceColumn";
export default function BalanceContainer(props) {
    const { getLogInUser, loginUserName, loginStatus, loginUserId } =
        useGetLogInUser();

    var groupCurrentDate;
    useEffect(() => {
        getLogInUser();
    }, []);
    return (
        <div>
            {props.balance_data.map((data, index) => {
                if (groupCurrentDate != data.date) {
                    groupCurrentDate = data.date;
                    return (
                        <>
                            {data.date}
                            <BalanceColumn data={data} key={index} />
                        </>
                    );
                }
                return <BalanceColumn data={data} key={index} />;
            })}
        </div>
    );
}
