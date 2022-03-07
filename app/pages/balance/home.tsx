import React, { useState, useEffect, useLayoutEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BalanceInput from "../../components/modal/BalanceInput";
import BalanceEdit from "../../components/modal/BalanceEdit";
import BalanceConteiner from "../../components/balance/BalanceContainer";
import { useGetBalance } from "../../components/hooks/useGetBalance";
import { useGetBalanceSummarize } from "../../components/hooks/useGetBalanceSummarize";
import dynamic from "next/dynamic";
import style from "./home.module.css";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(
    () => {
        return import("react-apexcharts");
    },
    { ssr: false }
);
interface BalanceSummarizeData {
    daily_total: number;
    weekly_total: number;
    week_history: [number];
    week_dates: [number];
}

interface BalanceyData {
    name: string;
    id: number;
    category_id: number;
    value: number;
    date: string;
    img_path: string;
    is_income: boolean;
}
export default function Home() {
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [open, setOpen] = React.useState(false);
    const [todaySum, setTodaySum] = React.useState<number>(0);
    const [weekSum, setWeekSum] = React.useState<number>(0);
    const [selectBalanceData, setSelectBalanceData] = React.useState<
        BalanceyData[]
    >([]);
    const { getBalance, balance } = useGetBalance();
    const { getBalanceSummarize, balanceSummarize } = useGetBalanceSummarize();
    const [balanceUpdateOpen, setBalanceUpdateOpen] = React.useState(false);

    function handleCreateClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    function handleBalanceUpdateClickOpen(data) {
        setSelectBalanceData(data);
        setBalanceUpdateOpen(true);
    }

    function handleBalanceUpdateClickClose() {
        setBalanceUpdateOpen(false);
    }

    function pilingUp(values: [number]) {
        let pilingUp = [];
        values.map((_, index) => {
            if (index) {
                pilingUp.push(pilingUp[index - 1] + values[index]);
            } else {
                pilingUp.push(values[index]);
            }
        });
        return pilingUp;
    }
    async function test() {
        const t: BalanceSummarizeData = await getBalanceSummarize();
        setOptions({
            ...options,
            ["xaxis"]: { categories: t.week_dates },
        });
        setSeries([
            {
                name: "積上支出額",
                data: pilingUp(t.week_history),
                type: "area",
            },
            {
                name: "支出額",
                data: t.week_history,
                type: "area",
            },
        ]);
        setTodaySum(t.daily_total);
        setWeekSum(t.weekly_total);
    }
    useEffect(() => {
        getBalance();
        test();
    }, []);

    const [options, setOptions] = useState<ApexOptions>({
        chart: {
            toolbar: {
                show: false,
            },
            id: "basic-bar",
            // width: "50%",
            zoom: {
                enabled: false,
            },
        },
        colors: ["#EEB324", "#556CD6"],

        fill: {
            opacity: [0.2, 0.4],
        },
        markers: {
            size: 3,
            colors: ["#EEB324", "#556CD6"],
            strokeWidth: 1,
        },

        stroke: {
            width: 1,
            curve: "smooth",
        },

        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["--", "--", "--", "--", "--", "--", "--"],
        },
    });
    const [series, setSeries] = useState([
        {
            name: "支出額",
            data: [0, 0, 0, 0, 0, 0, 0],
            type: "area",
        },
    ]);
    return (
        <div>
            <Header />
            <BalanceInput
                open={open}
                onClose={handleClose}
                getBalance={getBalance}
                updateChart={test}
            />

            <BalanceEdit
                open={balanceUpdateOpen}
                onClose={handleBalanceUpdateClickClose}
                getBalance={getBalance}
                updateChart={test}
                select_balance={selectBalanceData}
            />

            <div className={style.sum_container}>
                <h3 className={style.sum_lavel}>今日の合計支出</h3>
                <div className={style.sum_value}>{`${todaySum}円`}</div>
            </div>

            <div className={style.sum_container}>
                <h3 className={style.sum_lavel}>今週の合計支出</h3>
                <div className={style.sum_value}>{`${weekSum}円`}</div>
            </div>
            <div className={style.chart}>
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    height="130%"
                />
            </div>

            <BalanceConteiner
                balance_data={balance}
                hundleOpen={handleBalanceUpdateClickOpen}
            />
            <Footer handleClickOpen={handleCreateClickOpen} />
        </div>
    );
}
