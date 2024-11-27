import React from "react";
import { Avatar, Box, Card, CardContent, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";

interface IProps {
  logo: string;
  about: string;
  name: string;
  link: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      // margin: theme.spacing(1),
      // "& > *": {
      //   margin: theme.spacing(1),
      // },
      height: "100%",
      cursor: "pointer",
    },
    large: {
      width: "80%",
      marginLeft: "10%",
      height: "100%",
    },
    dummy: {
      position: "fixed",
      marginTop: "50%",
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
    },
    greyText: {
      color: theme.palette.type === "dark" ? "#c4c4c4" : "#5c5c5c",
    },
  })
);

export default function SponsorCard({ name, about, link, logo }: IProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={() => window.open(link, "_blank")}>
      <CardContent>
        <Grid container justify="center" alignContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box width="100%">
              <div className={classes.dummy}></div>
              <img src={logo} alt="" className={classes.large} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5">{name}</Typography>
            <hr />
            <Typography variant="caption">{about}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
