import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const sessionRepository = RepositoryFactory.get("session");
interface UserPostResponse {
    userName: string;
}
export function useGetLogInUser(inisialValue: string = "") {
    const [loginUserName, setLoginUserName] = useState(inisialValue);
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
    return { getLogInUser, loginUserName, loginStatus, loginUserId };
}
