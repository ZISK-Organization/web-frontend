import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default function About() {
  const classes = useStyles();

  return <div className={classes.root}>About</div>;
}
