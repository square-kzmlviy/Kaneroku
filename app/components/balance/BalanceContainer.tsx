import React, { useState, useEffect } from "react";
import { useGetLogInUser } from "../hooks/useGetLogInUser";
import style from "./BalanceContainer.module.css";
import BalanceColumn from "./BalanceColumn";
export default function BalanceContainer(props) {
    var groupCurrentDate;
    return (
        <div>
            {props.balance_data.map((data, index) => {
                if (groupCurrentDate != data.date) {
                    groupCurrentDate = data.date;
                    return (
                        <>
                            <div className={style.date}>{data.date}</div>
                            <BalanceColumn data={data} key={index} />
                        </>
                    );
                }
                return <BalanceColumn data={data} key={index} />;
            })}
        </div>
    );
}
