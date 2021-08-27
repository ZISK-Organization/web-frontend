import React /*, { useState }*/ from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Grid,
  // useTheme,
  // Card,
  // CardActionArea,
  // CardMedia,
  // CardContent,
  // IconButton,
} from "@material-ui/core";
// import useWindowDimensions from "../../Hooks/GetWindowDimensions";
// import SwipeableViews from "react-swipeable-views";
// import { ChevronRight, ChevronLeft } from "@material-ui/icons";
// import news from "../../Data/Mock/News.json";
import team from "../../Data/Team.json";
import TeamMemberCard from "./TeamMemberCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: { width: "80%", marginLeft: "10%" },
    actualitiesContainer: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    newsContainer: {
      width: "90%",
      marginLeft: "5%",
    },
    newsImage: {
      height: 256,
    },
    newsCard: {
      margin: theme.spacing(3),
      height: `calc(100% - ${2 * theme.spacing(3)}px)`,
    },
    newsArrow: {
      color: theme.palette.primary.contrastText,
    },
    cardContainer: {
      padding: theme.spacing(3),
    },
  })
);

export default function Home() {
  const classes = useStyles();
  // const theme = useTheme();
  // const [newsPage, setNewsPage] = useState(0);
  // const { width } = useWindowDimensions();

  // const newsPerPage = width <= theme.breakpoints.width("md") ? 1 : width <= theme.breakpoints.width("lg") ? 2 : 3;
  // const newsPages = Math.ceil(news.length / newsPerPage);

  return (
    <>
      <Container maxWidth="xl">
        <br />
        <br />
        <img className={classes.logo} src="/img/logo_large.svg" alt="logo" />
        <br />
        <br />
        <Typography variant="h2" align="center">
          Zábavné informatické soutěžní klání
        </Typography>
      </Container>
      <br />
      <br />
      {/* <div className={classes.actualitiesContainer}>
        <Container maxWidth="xl">
          <br />
          <Typography variant="h4" align="center">
            Aktuálně
          </Typography>
          <br />
          <div style={{ display: "flex" }}>
            <IconButton
              className={classes.newsArrow}
              aria-label="left"
              onClick={() => setNewsPage((newsPage - 1 + newsPages) % newsPages)}
            >
              <ChevronLeft />
            </IconButton>

            <SwipeableViews index={newsPage} onChangeIndex={setNewsPage}>
              {Array.from(Array(newsPages)).map((_, i) => (
                <Grid container className={classes.newsContainer}>
                  {news
                    .slice()
                    .reverse()
                    .slice(i * newsPerPage, Math.min(news.length, (i + 1) * newsPerPage))
                    .map((n, i) => (
                      <Grid item xs={12} md={6} lg={4} key={i}>
                        <Card className={classes.newsCard}>
                          <CardActionArea>
                            <CardMedia image={n.image} className={classes.newsImage} />
                            <CardContent>
                              <Typography variant="body2" color="textSecondary">
                                {new Date(n.date).toLocaleDateString()}
                              </Typography>
                              <br />
                              <Typography align="center" gutterBottom variant="h5" component="h2">
                                {n.title}
                              </Typography>
                              <Typography align="justify" variant="body2" color="textSecondary" component="p">
                                {n.shortText}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              ))}
            </SwipeableViews>
            <IconButton
              className={classes.newsArrow}
              aria-label="right"
              onClick={() => setNewsPage((newsPage + 1) % newsPages)}
            >
              <ChevronRight />
            </IconButton>
          </div>
        </Container>
      </div>
     */}
      <br />
      <br />
      <br />
      <br />
      <Typography align="center">
        TODO: Here will be some basic info and marketing überawesome shit for propagation of our seminar.
      </Typography>
      <br />
      <br />
      <br />
      <br />
      <Container maxWidth="xl">
        <Typography variant="h4">Organizátoři</Typography>
        <br />
        <Grid container>
          {team.map((t, i) => (
            <Grid className={classes.cardContainer} key={i} item xs={12} md={6} lg={4}>
              <TeamMemberCard
                photo={t.photo}
                name={t.name}
                age={5}
                motto={t.motto}
                email={t.email}
                github={t.github}
                about={t.about}
                web={undefined}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
