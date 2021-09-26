import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import { series } from "../../Types/taskTypes";
import { tasksService } from "../../Utils/ApiService";
import { useLayout } from "../../Layout/LayoutContext";
import SwipeableViews from "react-swipeable-views";
import useWindowDimensions from "../../Hooks/GetWindowDimensions";
import { useHistory } from "react-router";
import categories from "../../Data/TaskCategories.json";
import Flex from "../../Components/Flex";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

interface IProps {
  categoryId: string;
  seriesId: string;
  name: string;
}

export default function TutorialsSeries({ categoryId, seriesId, name }: IProps) {
  const classes = useStyles();
  const [tutorials, setTutorials] = useState<series | undefined>();
  const [newsPage, setNewsPage] = useState(0);
  const { width } = useWindowDimensions();
  const history = useHistory();

  const theme = useTheme();

  const newsPerPage = width <= theme.breakpoints.width("sm") ? 1 : width <= theme.breakpoints.width("lg") ? 2 : 3;
  const newsPages = Math.ceil((tutorials?.tasks || []).length / newsPerPage);

  const layout = useLayout();

  const cat = categories.filter((c) => c.id === categoryId)[0];

  useEffect(() => {
    tasksService.get(
      "/tutorials/series",
      { seriesId: seriesId, categoryId: categoryId },
      {
        success: setTutorials,
        error: () => layout.error("Při načítání tutoriálů došlo k chybě"),
      }
    );
    // eslint-disable-next-line
  }, [categoryId, seriesId]);

  return (
    <div className={classes.root}>
      <Typography variant="h6">{name}</Typography>
      <br />
      {tutorials && (
        <SwipeableViews index={newsPage} onChangeIndex={setNewsPage}>
          {Array.from(Array(newsPages)).map((_, i) => (
            <Grid container>
              {tutorials.tasks.slice(i * newsPerPage, Math.min(tutorials.tasks.length, (i + 1) * newsPerPage)).map((t) => (
                <Grid item xs={12} sm={6} lg={4} key={t.id}>
                  <Card onClick={() => history.push("/Tutorial/" + t.id)}>
                    <CardActionArea>
                      <CardContent>
                        <br />
                        <Flex>
                          <Avatar sizes="small" src={cat.icon} />
                          &nbsp;&nbsp;&nbsp;&nbsp;<Typography variant="body2">{t.name}</Typography>
                        </Flex>
                        <Button color="primary" style={{ float: "right" }}>
                          Zobrazit tutoriál
                        </Button>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <br />
                </Grid>
              ))}
            </Grid>
          ))}
        </SwipeableViews>
      )}
    </div>
  );
}
