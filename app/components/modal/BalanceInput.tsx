import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const categoryRepository = RepositoryFactory.get("category");
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";


interface CategoryData {
    name: string;
    id: number;
}

const initialCategoryData: CategoryData = {
    name: "",
    id: 0,
};
interface BalanceInput {
    open: boolean;
    onClose: () => void;
}

export default function BalanceInput(props: BalanceInput) {
    const classes = useStyles();
    const [categoryList, setcategoryList] = useState<CategoryData[]>([]);
    const [category, setCategory] = useState<CategoryData>(initialCategoryData);
    const { onClose, open } = props;

    async function getCategories() {
        try {
            const res = await categoryRepository.get<CategoryData>();
            console.log(res);
            setcategoryList(res.data);
        } catch (error) {
            const { status, message } = error.response;
            console.log(`Error! HTTP Status: ${status} ${error.response}`);
        }
    }

    function hundleClick(data: CategoryData) {
        console.log({ name: data.name, id: data.id });
        setCategory({ name: data.name, id: data.id });
        console.log(category);
    }

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">収支登録</DialogTitle>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category.name}
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
            </FormControl>
        </Dialog>
    );
}
