import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    icon: {
      width: "min(min(18vw, 16vh), 200px)",
      margin: 18,
    },
    label: {
      color: "white",
      textAlign: "center",
    },
  })
);

interface IProps {
  src: string;
  label: string;
  image: string;
}

export default function HomeRoutingIcon({ src, label, image }: IProps) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root} onClick={() => history.push(src)}>
      <img src={image} className={classes.icon} alt="icon" />
      <Typography align="center" className={classes.label} variant="h6">
        {label}
      </Typography>
    </div>
  );
}
