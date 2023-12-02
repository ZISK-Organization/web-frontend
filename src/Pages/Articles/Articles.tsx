import { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { articleMeta } from "../../Types/taskTypes";
import { useLayout } from "../../Layout/LayoutContext";
import { tasksService } from "../../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

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

export default function Articles() {
  const classes = useStyles();
  const layout = useLayout();
  const { isAuthenticated, user } = useAuth0();
  const history = useHistory();

  //@ts-ignore
  const isAdmin = isAuthenticated && user["https://zisk-go.com/roles"].includes("admin");

  const [articles, setArticles] = useState<articleMeta[]>([]);

  useEffect(
    () => {
      layout.setIsLoading(true);
      tasksService.get(
        isAdmin ? "/articles/admin/all" : "/articles/all",
        {},
        {
          success: (data: articleMeta[]) => {
            setArticles(data);
            layout.setIsLoading(false);
          },
          error: () => {
            layout.error("Při načítání článků došlo k chybě, zkuste to prosím později");
            layout.setIsLoading(false);
          },
        }
      );
    },
    //eslint-disable-next-line
    [isAdmin]
  );

  return (
    <Container maxWidth="xl">
      <br />
      <br />
      <Grid container spacing={3}>
        {articles
          .sort((a, b) => new Date(b.from).getTime() - new Date(a.from).getTime())
          .map((art) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={art.id}>
              <Card className={classes.card} onClick={() => history.push("/Articles/" + art.id)}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={art.photos[0] || "/img/placeholder.png"} title="" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {art.title}
                    </Typography>
                    <br />
                    <br />
                  </CardContent>
                </CardActionArea>
                <Grid container spacing={3} alignItems="center" justify="flex-end" className={classes.bottom}>
                  <Grid item xs={12}>
                    <Typography color="textSecondary" align="right">
                      {new Date(art.from).toLocaleDateString()}
                      {art.from !== art.to && ` - ${new Date(art.to).toLocaleDateString()}`}
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
