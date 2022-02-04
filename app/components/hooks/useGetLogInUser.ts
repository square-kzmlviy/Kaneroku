import React, { useState, useEffect, useLayoutEffect } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const sessionRepository = RepositoryFactory.get("session");
interface UserPostResponse {
    userName: string;
}
export function useGetLogInUser() {
    const [loginUserName, setLoginUserName] = useState<string>("");
    const [loginUserId, setLoginUserId] = useState(0);
    const [loginStatus, setLoginStatus] = useState<boolean>(false);
    async function getLogInUser() {
        try {
            const res = await sessionRepository.get<UserPostResponse>();
            setLoginUserName(res.data.name);
            setLoginStatus(res.data.logged_in);
            setLoginUserId(res.data.id);
            console.log(res);
        } catch (error) {}
    }
    useLayoutEffect(() => {
        getLogInUser();
    }, []);

    return { getLogInUser, loginUserName, loginStatus, loginUserId };
}
