import style from "../styles/index.module.css";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  return (
    <div className={style.main_container}>
      <img src="/static/index_logo.svg" width="85%" height="auto" />
      <p>自動は万能ではない</p>
      <p>節制とは、小さな努力の積み重ね</p>
      <Link href="/user/log_in">ログイン</Link>
      <Link href="/user/sign_up">新規登録</Link>
    </div>
  );
}
