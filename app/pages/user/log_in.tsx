import style from "../../styles/sign_up.module.css";
import React, { useState } from "react";
import Router from "next/router";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGetLogInUser } from "../../components/hooks/useGetLogInUser";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const sessionRepository = RepositoryFactory.get("session");
const userRepository = RepositoryFactory.get("users");

interface UserData {
    userEmail: string;
    userPass: string;
}

const userInitialData: UserData = {
    userEmail: "",
    userPass: "",
};

export default function sign_up() {
    const { getLogInUser, loginUserName, loginStatus, loginUserId } = useGetLogInUser();
    const [userData, setUserData] = useState<UserData>(userInitialData);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setUserData({ ...userData, [event.target.name]: value });
    }
    async function logInClick() {
        try {
            await sessionRepository.post({
                user: {
                    email: userData.userEmail,
                    password_digest: userData.userPass,
                },
            });

            Router.push("/");
            getLogInUser();
        } catch (error) {
            const { status, statusText } = error.response;
            console.log(`Error! HTTP Status: ${status} ${statusText}`);
        }
    }
    return (
        <Container maxWidth="sm">
            <img src="/static/logo.svg" width="100%" height="auto" />
            <form className={style.user_form}>
                <TextField
                    required
                    id="standard-basic"
                    label="mail"
                    name="userEmail"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    name="userPass"
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={logInClick}>
                    Login
                </Button>
            </form>
        </Container>
    );
}
