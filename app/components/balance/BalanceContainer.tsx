import React, { useState, useEffect } from "react";
import { useGetLogInUser } from "../hooks/useGetLogInUser";
import style from "./BalanceContainer.module.css";
import BalanceColumn from "./BalanceColumn";
export default function BalanceContainer(props) {
    var groupCurrentDate;
    let daily_sum = 0;
    return (
        <div className={style.container}>
            {props.balance_data.map((data, index) => {
                if (groupCurrentDate != data.date) {
                    groupCurrentDate = data.date;
                    return (
                        <>
                            <div className={style.date}>{`${data.date}`}</div>

                            <BalanceColumn
                                data={data}
                                key={index}
                                hundleOpen={props.hundleOpen}
                            />
                        </>
                    );
                } else {
                    daily_sum = daily_sum + data.value;
                    return (
                        <BalanceColumn
                            data={data}
                            key={index}
                            hundleOpen={props.hundleOpen}
                        />
                    );
                }
            })}
        </div>
    );
}
