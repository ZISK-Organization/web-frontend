import React from "react";
import { createStyles, makeStyles, Theme, LinearProgress, Typography } from "@material-ui/core";
import DiscussionThread from "../../Components/DiscussionThread";
import DiscussionPost from "../../Components/DiscussionPost";
import thread from "../../Data/Mock/DiscussionThread.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: "flex",
      alignItems: "center",
    },
    progress: {
      width: "calc(100% - 64px)",
      marginRight: 16,
    },
  })
);

interface IProps {
  maxPoints: number;
  results: any;
}

export default function Results({ maxPoints, results }: IProps) {
  const classes = useStyles();

  return (
    <>
      <br />
      <Typography variant="h6">Body</Typography>
      <br />
      <div className={classes.flex}>
        <LinearProgress
          className={classes.progress}
          value={Math.min(100, (100 * results.points) / maxPoints)}
          color="primary"
          variant="determinate"
        />
        <Typography>
          {results.points} / {maxPoints}
        </Typography>
      </div>
      <br />
      <br />
      <Typography variant="h6">Komentář k opravení</Typography>
      <br />
      <br />

      <DiscussionPost post={thread.posts[0]} />
    </>
  );
}
