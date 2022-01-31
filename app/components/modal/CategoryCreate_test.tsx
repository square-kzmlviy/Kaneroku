import React, { useState, useEffect } from "react";
function test<T>(arg: T): T {
    return arg;
}

test<number>(1); //=> 1

test<string>("文字列"); //=> 文字列
//※ Genericsでも型推論ができるので、引数から型が明示的にわかる場合は省略が可能
test("文字列２"); //=> "文字列２"

function testExNumber(arg: number): number {
    return arg;
}

var text: string = "これは文字列";
var price: number = 123;

interface MyParams {
    param1: string;
    param2: number;
}

const initialMyParamsData: MyParams = {
    param1: "",
    param2: 0,
};

export default function CategoryCreate_test() {
    // const [state名,setState名] = useState<型名>　(初期値)
    const [myParams, setmyParams] = useState<MyParams>(initialMyParamsData);
    const [price, setprice] = useState<number>(0);

    function hundleChange(e) {
        setmyParams({ ...myParams, [e.target.name]: e.target.name });
    }

    return (
        <div>
            <input
                name="params1"
                value={myParams.param1}
                onChange={hundleChange}
            />
        </div>
    );
}

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setLoginData({ ...loginData, [event.target.name]: value });
    //場合：emailでtest@gmail.comが入力された時
    //①{loginEmail:“”,loginPass:“”}
    //setLoginData({ ...loginData, [event.target.name]: value });
    //setLoginData({ loginEmail:“te”,loginPass:“”, loginEmail: tes });
    //setLoginData({ loginEmail:“tes”,loginPass:“”});
}
