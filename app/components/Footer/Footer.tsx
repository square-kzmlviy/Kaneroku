import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { useGetLogInUser } from "../hooks/useGetLogInUser";
import style from "../../styles/footer.module.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
interface FooterProps {
    handleClickOpen: () => void;
}
const useStyles = makeStyles({
    appBar: {
        top: "auto",
        bottom: 0,
        height: "7vh",
    },
    fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto",
    },
});
export default function Footer(props: FooterProps) {
    const { handleClickOpen } = props;
    const classes = useStyles();
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.fabButton}
                >
                    <AddIcon onClick={handleClickOpen} />
                </Fab>
            </Toolbar>
        </AppBar>
    );
}
