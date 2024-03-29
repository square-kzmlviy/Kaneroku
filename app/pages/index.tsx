import style from "../styles/index.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useGetLogInUser } from "../components/hooks/useGetLogInUser";
import Router from "next/router";
export default function Home() {
    const { getLogInUser, loginUserName, loginStatus, loginUserId, responce } =
        useGetLogInUser();
    const [view, setView] = useState<number>(0);
    useEffect(() => {
        if (loginStatus) Router.push("/balance/home");
        setView(responce);
    }, [responce]);
    return (
        <div>
            {view && !loginStatus ? (
                <div className={style.main_container}>
                    <img
                        src="/static/index_logo.svg"
                        width="auto"
                        height="60%"
                    />
                    <p>自動は万能ではない</p>
                    <p>節制とは、小さな努力の積み重ね</p>
                    <Link href="/user/log_in">ログイン</Link>
                    <Link href="/user/sign_up">新規登録</Link>
                </div>
            ) : (
                <div className={style.blank}></div>
            )}
        </div>
    );
}
