import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const categoryRepository = RepositoryFactory.get("category");
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FormControl from "@material-ui/core/FormControl";
import { useTheme } from "@material-ui/core/styles";

const fullScreen = (theme: Theme) => useMediaQuery(theme.breakpoints.down("lg"));
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
);

interface CategoryData {
    name: string;
}

const initialCategoryData: CategoryData = {
    name: "",
};
interface CategoryCreateProps {
    open: boolean;
    onClose: () => void;
}

export default function CategoryCreate(props: CategoryCreateProps) {
    const classes = useStyles();
    const [category, setCategory] = useState<CategoryData>(initialCategoryData);
    const [categoryCreateOpen, setCategoryCreateOpen] = React.useState(false);
    const [value, setValue] = useState<number>(0);
    const [isIncome, setIsIncome] = useState<boolean>(false);
    const { onClose, open } = props;
    const [query, setQuery] = React.useState("idle");
    const timerRef = React.useRef<number>();

    const handleClose = () => {
        onClose();
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setCategory({ ...category, [event.target.name]: value });
    }
    const categoryTypeChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        newValue ? setIsIncome(true) : setIsIncome(false);
        console.log(isIncome);
    };

    async function categoryCreateClick() {
        clearTimeout(timerRef.current);

        if (query !== "idle") {
            setQuery("idle");
            return;
        }

        setQuery("progress");
        timerRef.current = window.setTimeout(async function api() {
            setQuery("success");
            try {
                await categoryRepository.createPost<CategoryData>({
                    category: {
                        name: category.name,
                        is_income: isIncome,
                    },
                });
                console.log(`Logaut: ${status} `);
                handleClose();
            } catch (error) {
                const { status, message } = error.response;
                console.log(`Error! HTTP Status: ${status} ${error.response}`);
            }
        }, 2000);
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            fullWidth={true}
        >
            <DialogTitle id="simple-dialog-title">カテゴリ追加</DialogTitle>
            <Tabs
                value={value}
                onChange={categoryTypeChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                <Tab icon={<CallMadeIcon />} label="Expense" />
                <Tab icon={<CallReceivedIcon />} label="Income" />
            </Tabs>
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-basic"
                    label="name"
                    name="name"
                    onChange={handleChange}
                />

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
                <Button onClick={categoryCreateClick}>カテゴリ作成</Button>
            </FormControl>
        </Dialog>
    );
}
