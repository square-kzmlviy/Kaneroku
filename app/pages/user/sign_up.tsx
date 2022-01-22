import style from "../../styles/sign_up.module.css";
import React, { useState } from "react";
import Router from "next/router";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useGetLogInUser } from "../../components/hooks/useGetLogInUser";
import Button from "@material-ui/core/Button";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const sessionRepository = RepositoryFactory.get("session");
const userRepository = RepositoryFactory.get("users");

interface UserData {
    userEmail: string;
    userPass: string;
    userName: string;
    userPassConfi: string;
}

const userInitialData: UserData = {
    userEmail: "",
    userPass: "",
    userPassConfi: "",
    userName: "",
};

export default function sign_up() {
    const [userData, setUserData] = useState<UserData>(userInitialData);
    const { getLogInUser, loginUserName, loginStatus, loginUserId } =
        useGetLogInUser();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setUserData({ ...userData, [event.target.name]: value });
    }

    async function signUpClick() {
        try {
            await userRepository.createPost<UserData>({
                user: {
                    name: userData.userName,
                    email: userData.userEmail,
                    password: userData.userPass,
                    password_confirmation: userData.userPassConfi,
                },
            });
            console.log(`Logaut: ${status} `);
            getLogInUser();
            Router.push("/balance/home");
        } catch (error) {
            const { status, message } = error.response;
            console.log(`Error! HTTP Status: ${status} ${error}`);
        }
    }

    return (
        <Container maxWidth="sm">
            <img src="/static/logo.svg" width="100%" height="auto" />
            <form className={style.user_form}>
                <TextField
                    required
                    id="standard-basic"
                    label="name"
                    name="userName"
                    onChange={handleChange}
                />
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
                    name="userPass"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="userPassConfi"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={signUpClick}
                >
                    signup
                </Button>
            </form>
        </Container>
    );
}
