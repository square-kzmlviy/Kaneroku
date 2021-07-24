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
    const [categoryList, setcategoryList] = useState<CategoryData[]>([]);
    const [category, setCategory] = useState<CategoryData>(initialCategoryData);