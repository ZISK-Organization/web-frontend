import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 6,
      paddingBottom: 6,
      borderTop: "solid 2px #f0f0f0",
      display: "flex",
    },
    flexGrow: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
    },
  })
);

interface IProps {
  hidden: boolean;
}

export default function ({ hidden }: IProps) {
  const classes = useStyles();

  return (
    <>
      {!hidden && (
        <>
          <div className={classes.root}>
            <Typography noWrap display="inline">
              © Jakub Šťastný
            </Typography>
            <span className={classes.flexGrow}>&nbsp;</span>
            <Typography noWrap display="inline">
              <Link to="/PrivacyPolicy" target="_blank" className={classes.link}>
                Privacy Policy
              </Link>
            </Typography>
          </div>
        </>
      )}
    </>
  );
}
