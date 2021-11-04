import React from "react";
import { Container, createStyles, Grid, makeStyles, Typography, Button } from "@material-ui/core";
import { getThemeStoredCode } from "../Utils/Common";

interface IProps {
  title: string;
  text: string;
  image: string;
  orientation: "standard" | "reversed";
  theme: "light" | "dark";
  link?: string;
  linkText?: string;
}

const useStyles = (cardTheme: "dark" | "light") =>
  makeStyles((theme) =>
    createStyles({
      homeCard: {
        width: "100%",
        backgroundColor: cardTheme === "light" ? "transparent" : getThemeStoredCode() === "light" ? "#F6F8FB" : "#121212",
      },
      cardImage: {
        height: "40vh",
        marginTop: "5vh",
        marginBottom: "5vh",
        marginRight: 32,
        marginLeft: 32,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center center",
      },
      cardText: {
        marginBottom: "5vh",
      },
      center: {
        textAlign: "center",
      },
      link: {
        marginTop: "32px",
        float: "right",
        color: cardTheme === "light" ? "black" : theme.palette.primary.contrastText,
        borderColor: cardTheme === "light" ? "black" : theme.palette.primary.contrastText,
      },
    })
  );

export default function DataCard({ title, text, image, orientation, theme, link, linkText }: IProps) {
  const classes = useStyles(theme)();

  return (
    <div className={classes.homeCard}>
      <Container maxWidth="lg">
        <Grid container direction={orientation === "standard" ? "row" : "row-reverse"} alignItems="center" justify="center">
          <Grid item md={6} className={classes.center}>
            <div style={{ backgroundImage: `url(${image})` }} className={classes.cardImage} />
          </Grid>
          <Grid item md={6} xs={12} className={classes.cardText}>
            <Typography variant="h3" style={{ marginBottom: 22 }}>
              {title}
            </Typography>
            <Typography variant="body1" align="justify">
              {text}
            </Typography>
            {link && (
              <Button
                href={link}
                target={link.startsWith("/") ? "" : "_blank"}
                variant="outlined"
                rel="noreferrer"
                className={classes.link}
              >
                {linkText}
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
