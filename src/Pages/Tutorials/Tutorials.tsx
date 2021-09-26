import React, { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  // LinearProgress,
} from "@material-ui/core";
import categories from "../../Data/Tutorials/Categories.json";
import { useHistory } from "react-router";
import { tasksService } from "../../Utils/ApiService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "100%",
      position: "relative",
    },

    bottom: {
      position: "absolute",
      bottom: 8,
    },
    media: {
      height: 140,
    },
  })
);

export default function Tutorials() {
  const classes = useStyles();
  const history = useHistory();
  const [tutorialsCounts, setTutorialsCounts] = useState<{ [index: string]: number }>({});

  useEffect(() => {
    tasksService.get(
      "/tutorials/counts",
      {},
      {
        success: setTutorialsCounts,
        error: console.log,
      }
    );
  }, []);

  const getCorrectTutorialForm = (count: number) =>
    count === 1 ? "Tutoriál" : count > 2 && count < 5 ? "Tutoriály" : "Tutoriálů";

  return (
    <Container maxWidth="xl">
      <br />
      <br />
      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={cat.categoryId}>
            <Card className={classes.card} onClick={() => history.push("/Tutorials/" + cat.categoryId)}>
              <CardActionArea>
                <CardMedia className={classes.media} image={cat.imagePath} title="Contemplative Reptile" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {cat.categoryName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {cat.description}
                  </Typography>
                  <br />
                  <br />
                </CardContent>
              </CardActionArea>
              <Grid container spacing={3} alignItems="center" className={classes.bottom}>
                <Grid item xs={8}>
                  {/* <LinearProgress style={{ marginLeft: 16 }} variant="determinate" value={64} /> */}
                </Grid>
                <Grid item xs={4}>
                  <Typography color="textSecondary">
                    {tutorialsCounts[cat.categoryId] || 0} {getCorrectTutorialForm(tutorialsCounts[cat.categoryId] || 0)}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
    </Container>
  );
}
