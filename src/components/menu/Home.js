import React from "react"

import "./Home.css"
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"
import { white } from "material-ui/styles/colors";

const useStyles = makeStyles(theme => ({
    centerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column"
    },
    mainButton: {
        color: white,
        textTransform: "none",
        fontSize: "35px",
        marginTop: "80px"
    },
    HomeTitle: {
        fontSize: "6rem",
        lineHeight: "100px",
        margin: 0
    },
    HomeSubTitle: {
        fontSize: "1.8rem",
        lineHeight: "100px",
        margin: 0
    }

}));

function Home({ setExpanded }) {
    const classes = useStyles();
    return (
        <div className={classes.centerContainer}>
            <h1 className={classes.HomeTitle}>Bienvenue</h1>
            <h1 className={classes.HomeTitle}>sur <span style={{ color: "var(--primary)" }}>EpiKodi</span></h1>
            <p className={classes.HomeSubTitle}>Centralisez tous vos médias en une seule application</p>
            {/* <Button className={classes.mainButton} variant="contained" style={{backgroundColor: "var(--primary)"}}>Explorer l'application</Button> */}
        </div>
    )
}


export default Home