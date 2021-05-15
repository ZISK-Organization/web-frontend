import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default function Home() {
  const classes = useStyles();

  return <div className={classes.root}>Home</div>;
}
