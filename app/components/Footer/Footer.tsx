import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useGetLogInUser } from "../hooks/useGetLogInUser";
import style from "../../styles/footer.module.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
export default function Footer() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                top: "auto",
                bottom: 0,
            },
            fabButton: {
                position: "absolute",
                zIndex: 1,
                top: -30,
                left: 0,
                right: 0,
                margin: "0 auto",
            },
        })
    );
    const classes = useStyles();
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                    <AddIcon />
                </Fab>
            </Toolbar>
        </AppBar>
    );
}
