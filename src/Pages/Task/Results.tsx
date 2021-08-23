import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, LinearProgress, Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useLayout } from "../../Layout/LayoutContext";
import { submissionsService } from "../../Utils/ApiService";
import DiscussionThread from "../../Components/DiscussionThread";

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
  taskId: string;
}

export default function Results({ maxPoints, taskId }: IProps) {
  const classes = useStyles();
  const [results, setResults] = useState(0);
  const { isAuthenticated, user } = useAuth0();

  const layout = useLayout();

  useEffect(() => {
    isAuthenticated &&
      submissionsService.get(
        "points",
        {
          userId: user?.sub,
          taskId: taskId,
        },
        {
          success: setResults,
          error: () => layout.error("Při načítání výsledků došlo k chybě"),
        }
      );
    // eslint-disable-next-line
  }, [isAuthenticated, taskId]);

  return (
    <>
      <br />
      <Typography variant="h6">Body</Typography>
      <br />
      <div className={classes.flex}>
        <LinearProgress
          className={classes.progress}
          value={Math.min(100, (100 * results) / maxPoints)}
          color="primary"
          variant="determinate"
        />
        <Typography>
          {results} / {maxPoints}
        </Typography>
      </div>
      <br />
      <br />
      <Typography variant="h6">Komentář k opravení</Typography>
      <br />
      <br />

      <DiscussionThread
        thread={{
          channel: "",
          id: 0,
          channelType: "",
          children: [],
        }}
        setThread={() => {}}
      />
    </>
  );
}
