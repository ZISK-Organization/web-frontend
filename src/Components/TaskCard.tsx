import React from "react";
import { Avatar, Card, CardActionArea, CardContent, createStyles, makeStyles, Theme, Tooltip, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import categories from "../Data/TaskCategories.json";
import { taskMeta } from "../Types/taskTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      "&>*": {
        margin: 4,
      },
    },
  })
);

interface IProps {
  task: taskMeta;
}

export default function TaskCard({ task }: IProps) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card
      onClick={() => {
        history.push(`/Tasks/${task.id}`);
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {task.name}
          </Typography>
          <Typography color="textSecondary">{new Date(task.deadline).toLocaleString()}</Typography>
          <br />
          <br />
          <div className={classes.iconsContainer}>
            {task.category.map((cat) => (
              <Tooltip title={categories.filter((c) => c.id === cat)[0].name} key={cat}>
                <Avatar sizes="small" src={categories.filter((c) => c.id === cat)[0].icon} />
              </Tooltip>
            ))}
          </div>
          <br />
          <br />
          <Rating color="primary" value={task.difficulty} readOnly max={4} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
