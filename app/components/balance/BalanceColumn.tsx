import React, { useState, useEffect } from "react";
import { useGetLogInUser } from "../hooks/useGetLogInUser";
import style from "../../styles/header.module.css";
export default function BalanceContainer(props) {
    const { getLogInUser, loginUserName, loginStatus, loginUserId } =
        useGetLogInUser();
    useEffect(() => {
        getLogInUser();
    }, []);
    return (
        <div>
            <img
                width="10%"
                src={
                    props.data.img_path
                        ? `/static/${props.data.img_path}.svg`
                        : `/static/category_icon_0.svg`
                }
            />
            {props.data.name}
            {props.data.value}
            {props.data.date}
        </div>
    );
}
