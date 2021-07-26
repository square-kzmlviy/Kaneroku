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

const fullScreen = (theme: Theme) => useMediaQuery(theme.breakpoints.down("xl"));
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        valueinput: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        categoryLabel: {
            // position: "static",
        },
        select: { marginTop: "0" },
    })
);

interface CategoryData {
    name: string;
    id: number;
}

interface BalanceData {
    value: number;
}

const initialCategoryData: CategoryData = {
    name: "",
    id: 0,
};

const initialBalanceData: BalanceData = {
    value: 0,
};

interface BalanceInput {
    open: boolean;
    onClose: () => void;
}

export default function BalanceInput(props: BalanceInput) {
    const classes = useStyles();
    const [categoryList, setcategoryList] = useState<CategoryData[]>([]);
    const [category, setCategory] = useState<CategoryData>(initialCategoryData);
    const [balance, setBalance] = useState<BalanceData>(initialBalanceData);
    const [categoryCreateOpen, setCategoryCreateOpen] = React.useState(false);
    const { onClose, open } = props;
    const [value, setValue] = useState<number>(0);
    const [isIncome, setIsIncome] = useState<boolean>(false);
    const [query, setQuery] = React.useState("idle");
    const timerRef = React.useRef<number>();

    async function getCategories() {
        try {
            const res = await categoryRepository.get<CategoryData>();
            console.log(res);
            setcategoryList(res.data.filter((x) => x.is_income === isIncome));
        } catch (error) {
            const { status, message } = error.response;
            console.log(`Error! HTTP Status: ${status} ${error.response}`);
        }
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
                await balanceRepository.createPost({
                    money_balance: {
                        value: balance.value,
                        category_id: category.id,
                    },
                });

                handleClose();
            } catch (error) {
                const { status, statusText } = error.response;
                console.log(`Error! HTTP Status: ${status} ${statusText}`);
            }
        }, 2000);
    }

    function hundleClick(data: CategoryData) {
        console.log({ name: data.name, id: data.id });
        setCategory({ name: data.name, id: data.id });
        console.log(category);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setBalance({ ...balance, [event.target.name]: value });
    }

    const categoryTypeChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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
        getCategories();
    }, [isIncome]);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            fullWidth={true}
        >
            <DialogTitle id="simple-dialog-title">収支登録</DialogTitle>
            <Paper elevation={0}>
                <Tabs
                    value={value}
                    onChange={categoryTypeChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                >
                    <Tab label="Expence" />
                    <Tab label="Income" />
                </Tabs>
            </Paper>
            <TextField
                id="standard-basic"
                label="value"
                name="value"
                type="number"
                onChange={handleChange}
                className={classes.valueinput}
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label" className={classes.categoryLabel}>
                    Category
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category.name}
                    className={classes.select}
                    defaultValue=""
                >
                    {categoryList.map((data) => {
                        return (
                            <MenuItem value={data.name} onClick={() => hundleClick(data)}>
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
            <Button variant="contained" color="primary" onClick={hundleSubmit}>
                登録
            </Button>
        </Dialog>
    );
}
