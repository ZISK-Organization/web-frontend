import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, Container, Grid, Typography, Avatar } from "@material-ui/core";
import { taskMeta } from "../../Types/taskTypes";
import { useLayout } from "../../Layout/LayoutContext";
import { tasksService } from "../../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import { Rating } from "@material-ui/lab";
import categories from "../../Data/TaskCategories.json";
import TaskCard from "../../Components/TaskCard";
import { reducers } from "../../Utils/Reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      "&>*": {
        margin: 4,
      },
      cursor: "pointer",
    },
  })
);

export default function Archive() {
  const classes = useStyles();

  const [allTasks, setAllTasks] = useState<taskMeta[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const layout = useLayout();
  const { isAuthenticated, user } = useAuth0();

  //@ts-ignore
  const isAdmin = isAuthenticated && user["https://zisk-go.com/roles"].includes("admin");

  useEffect(
    () => {
      layout.setIsLoading(true);
      tasksService.get(
        isAdmin ? "/admin/all" : "/all",
        {},
        {
          success: (data: taskMeta[]) => {
            setAllTasks(data);
            layout.setIsLoading(false);
          },
          error: () => {
            layout.error("Při načítání úloh došlo k chybě");
            layout.setIsLoading(false);
          },
        }
      );
    },
    //eslint-disable-next-line
    []
  );

  const filteredTasks = allTasks.filter((t) => filters.length === 0 || t.category.map((cat) => filters.includes(cat)).reduce(reducers.or));
  const tasksPerDifficulty = [1, 2, 3, 4].map((diff) => filteredTasks.filter((t) => t.difficulty === diff));

  return (
    <Container maxWidth="xl">
      <Typography variant="h3">Archív úloh</Typography>
      <br />
      <Typography variant="h6">Filtrovat úlohy dle kategorií</Typography>
      <br />
      <Grid container>
        {categories.map((cat) => (
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
            key={cat.id}
            style={filters.length === 0 || filters.includes(cat.id) ? {} : { opacity: "40%" }}
            className={classes.iconsContainer}
            onClick={() =>
              setFilters(
                filters.length === 0
                  ? [cat.id]
                  : filters.includes(cat.id)
                  ? filters.filter((f) => f !== cat.id)
                  : filters.length === categories.length - 1
                  ? []
                  : [...filters, cat.id]
              )
            }
          >
            <Avatar sizes="small" src={cat.icon} /> <Typography> {cat.name}</Typography>
          </Grid>
        ))}
      </Grid>
      <br />
      {
        // TODO loading
        [1, 2, 3, 4]
          .filter((diff) => tasksPerDifficulty[diff - 1].length > 0)
          .map((diff) => (
            <React.Fragment key={diff}>
              <Rating size="large" color="primary" value={diff} readOnly max={4} />
              <Grid container spacing={3}>
                {tasksPerDifficulty[diff - 1].map((task) => (
                  <Grid item key={task.id} lg={2}>
                    <br />
                    <TaskCard task={task} />
                  </Grid>
                ))}
              </Grid>
              <br />
            </React.Fragment>
          ))
      }
    </Container>
  );
}
