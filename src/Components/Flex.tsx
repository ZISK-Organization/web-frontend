import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

interface IProps {
  children: React.ReactNode;
  verticalAlign?: string;
}

export default function Flex({ children, verticalAlign }: IProps) {
  const classes = useStyles();

  const alignItems = verticalAlign || "center";

  return (
    <div style={{ alignItems: alignItems }} className={classes.root}>
      {children}
    </div>
  );
}
