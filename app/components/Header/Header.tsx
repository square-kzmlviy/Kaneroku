import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useGetLogInUser } from "../../components/hooks/useGetLogInUser";
import style from "../../styles/header.module.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
export default function Header() {
    const { getLogInUser, loginUserName, loginStatus, loginUserId } = useGetLogInUser();
    useEffect(() => {
        getLogInUser();
    }, []);
    return (
        <AppBar position="static">
            <Toolbar className={style.header_toolber}>
                <img src="/static/logo.svg" width="auto" height="40px" />
                <div className={style.header_user}>
                    <AccountCircleIcon />
                    {loginUserName}
                </div>
            </Toolbar>
        </AppBar>
    );
}
