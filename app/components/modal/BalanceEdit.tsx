import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const categoryRepository = RepositoryFactory.get("category");
const balanceRepository = RepositoryFactory.get("balance");
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CategoryCreate from "./CategoryCreate";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import style from "../../styles/balance_modal.module.css";
import { useGetCategories } from "../hooks/useGetCategories";

const fullScreen = (theme: Theme) =>
    useMediaQuery(theme.breakpoints.down("xl"));
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            marginLeft: "2.5%",
            marginTop: "1vh",
            minWidth: "95%",
            fontSize: "4vw",
        },
        valueinput: {
            marginLeft: "2.5%",
            minWidth: "95%",
            fontSize: "32px !important",
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        categoryLabel: {
            // position: "static",
        },
        select: { marginTop: "0", fontSize: "5.5vw", color: "#222d62" },
        muiPaperRounded: {
            borderRadius: "0px",
            height: "6vh",
            fontSize: "5vw",
            fontWeight: "bold",
        },
        toggle_paper: {
            backgroundColor: "#ffffff00",
        },
        fontsizeM: {
            fontSize: "3vw",
        },
    })
);

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();

var toTwoDigits = function (num, digit) {
    num += "";
    if (num.length < digit) {
        num = "0" + num;
    }
    return num;
};

var yyyy = toTwoDigits(year, 4);
var mm = toTwoDigits(month, 2);
var dd = toTwoDigits(day, 2);
var ymd = yyyy + "-" + mm + "-" + dd;

interface CategoryData {
    name: string;
    id: number;
}

interface BalanceData {
    name: string;
    id: number;
    category_id: number;
    value: number;
    date: string;
    img_path: string;
    is_income: boolean;
}

const initialCategoryData: CategoryData = {
    name: "",
    id: 0,
};

interface BalanceInput {
    open: boolean;
    onClose: () => void;
    getBalance: () => void;
    updateChart: () => void;
    select_balance: any;
}

export default function BalanceInput(props: BalanceInput) {
    const classes = useStyles();
    const initialBalanceData: BalanceData = props.select_balance;
    const [categoryList, setcategoryList] = useState<CategoryData[]>([]);
    const [category, setCategory] = useState<CategoryData>(initialCategoryData);
    const [balance, setBalance] = useState<BalanceData>(initialBalanceData);
    const [keyClickCount, setKeyClickCount] = useState<number>(1);
    const [categoryCreateOpen, setCategoryCreateOpen] = React.useState(false);
    const { onClose, open } = props;
    const [value, setValue] = useState<number>(0);
    const [isIncome, setIsIncome] = useState<boolean>(false);
    const [query, setQuery] = React.useState("idle");
    const timerRef = React.useRef<number>();
    const inputRef = React.useRef(null);
    const [inputError, setInputError] = useState(false);
    const { getCategories, categories } = useGetCategories();

    function setCategories() {
        getCategories(isIncome);
        setcategoryList(categories);
    }

    async function hundleSubmit() {
        clearTimeout(timerRef.current);

        if (query !== "idle") {
            setQuery("idle");
            return;
        }

        setQuery("progress");
        timerRef.current = window.setTimeout(async function api() {
            setQuery("success");
            try {
                await balanceRepository.updatePost(
                    {
                        money_balance: {
                            value: balance.value,
                            date: balance.date,
                            category_id: category.id,
                        },
                    },
                    balance.id
                );
                props.getBalance();
                props.updateChart();

                handleClose();
            } catch (error) {
                const { status, statusText } = error.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
                setInputError(true);
            }
        }, 2000);
    }

    function hundleClick(data: CategoryData) {
        console.log({ name: data.name, id: data.id });
        setCategory({ name: data.name, id: data.id });
        console.log(category);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (inputRef.current) {
            const ref = inputRef.current;
            if (!ref.validity.valid) {
                setInputError(true);
            } else {
                setInputError(false);
            }
        }
        const value = event.target.value;
        setBalance({ ...balance, [event.target.name]: value });
    }

    function hundleKeyClick(number: number) {
        if (number < 0) {
            setBalance({
                ...balance,
                ["value"]: 0,
            });
            return 0;
        }
        if (number == 10) {
            setBalance({
                ...balance,
                ["value"]: balance.value * 100,
            });
            return 0;
        }
        setBalance({
            ...balance,
            ["value"]: balance.value * 10 + number,
        });
        console.log(balance.value * 10 + number);
    }

    const categoryTypeChange = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        setValue(newValue);
        newValue ? setIsIncome(true) : setIsIncome(false);
        console.log(isIncome);
    };

    const handleClose = () => {
        onClose();
    };

    function handleCategoryCreateClickOpen() {
        setCategoryCreateOpen(true);
    }

    function handleCategoryCreateClose() {
        setCategoryCreateOpen(false);
        setCategories();
    }

    useEffect(() => {
        setCategories();
        console.log(props.select_balance);
    }, [isIncome]);
    useEffect(() => {
        setBalance(props.select_balance);
        setCategory({
            name: props.select_balance.name,
            id: props.select_balance.category_id,
        });
    }, [props.select_balance]);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            fullWidth={true}
        >
            {/* <DialogTitle id="simple-dialog-title">{`Edit Balance`}</DialogTitle> */}
            <div className={style.modal_header}>
                <p>Edit Balance</p>
            </div>
            <div className={style.modal_container}>
                <Paper elevation={0} className={classes.toggle_paper}>
                    <Tabs
                        value={value}
                        variant="fullWidth"
                        onChange={categoryTypeChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        className={style.toggle_paper}
                    >
                        <Tab className={style.toggle_paper} label="Expence" />
                        <Tab label="Income" />
                    </Tabs>
                </Paper>
                <input
                    name="date"
                    type="date"
                    value={balance.date}
                    onChange={handleChange}
                    className={style.date_input}
                />
                <TextField
                    id="standard-basic"
                    label="value"
                    name="value"
                    type="number"
                    onChange={handleChange}
                    className={classes.valueinput}
                    error={inputError}
                    inputProps={{ minLength: 1, pattern: "^[a-zA-Z0-9_]+$" }}
                    inputRef={inputRef}
                    value={balance.value}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel
                        id="demo-simple-select-label"
                        className={classes.categoryLabel}
                    >
                        Category
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category.name}
                        className={classes.select}
                        defaultValue=""
                        error={inputError}
                    >
                        {categories.map((data, index) => {
                            return (
                                <MenuItem
                                    value={data.name}
                                    onClick={() => hundleClick(data)}
                                    key={index}
                                >
                                    {data.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <a
                        onClick={handleCategoryCreateClickOpen}
                        className={style.category_create_link}
                    >
                        カテゴリを追加する
                    </a>
                    <CategoryCreate
                        open={categoryCreateOpen}
                        onClose={handleCategoryCreateClose}
                    />
                </FormControl>
            </div>
            <div className={style.number_key_container}>
                {[...Array(9)].map((_, index) => {
                    return (
                        <button
                            onClick={() => hundleKeyClick(index + 1)}
                            className={style.number_key}
                        >
                            {index + 1}
                        </button>
                    );
                })}

                <button
                    onClick={() => hundleKeyClick(-1)}
                    className={style.number_key}
                >
                    AC
                </button>
                <button
                    onClick={() => hundleKeyClick(0)}
                    className={style.number_key}
                >
                    0
                </button>
                <button
                    onClick={() => hundleKeyClick(10)}
                    className={style.number_key}
                >
                    00
                </button>
            </div>
            <div>
                <Fade
                    in={query === "progress"}
                    style={{
                        transitionDelay: "200ms",
                    }}
                    unmountOnExit
                >
                    <LinearProgress />
                </Fade>
            </div>
            <Button
                className={classes.muiPaperRounded}
                variant="contained"
                color="primary"
                onClick={hundleSubmit}
            >
                登録
            </Button>
        </Dialog>
    );
}
