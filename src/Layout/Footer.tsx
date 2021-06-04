import React from "react";
import { createStyles, makeStyles, Theme, Typography, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import packageJson from "../../package.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 6,
      paddingBottom: 6,
      borderTop: "solid 2px #f0f0f0",
    },
    innerRoot: {
      display: "flex",
    },
    flexGrow: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
      cursor: "pointer",
    },
  })
);

interface IProps {
  hidden: boolean;
}

export default function Footer({ hidden }: IProps) {
  const classes = useStyles();

  const serviceWorkerUnregistration = () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });

    localStorage.setItem("userID", "");
    window.location.reload();
  };

  return (
    <>
      {!hidden && (
        <>
          <br />
          <div className={classes.root}>
            <Container maxWidth="xl">
              <div className={classes.innerRoot}>
                <Typography noWrap display="inline">
                  © Jakub Šťastný 2021
                  <br />
                  Version {packageJson.version}
                </Typography>
                <span className={classes.flexGrow}>&nbsp;</span>
                <Typography noWrap display="inline">
                  <Link to="/PrivacyPolicy" target="_blank" className={classes.link}>
                    Privacy Policy
                  </Link>
                  <br />
                  <span onClick={() => serviceWorkerUnregistration()} className={classes.link}>
                    Delete cache
                  </span>
                </Typography>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
}
