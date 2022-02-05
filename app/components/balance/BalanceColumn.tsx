import React, { useState, useEffect } from "react";
import { useGetLogInUser } from "../hooks/useGetLogInUser";
import style from "./BalanceColumn.module.css";
export default function BalanceColumn(props) {
    return (
        <div className={style.container}>
            <img
                width="10%"
                src={
                    props.data.img_path
                        ? `/static/${props.data.img_path}.svg`
                        : `/static/category_icon_0.svg`
                }
            />
            <div className={style.name}>{props.data.name}</div>
            <div className={style.value}>{`${props.data.value}円`}</div>
            <div className={style.aaa}>
            </div>
        </div>
    );
}
