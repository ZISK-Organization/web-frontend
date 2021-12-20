import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, LinearProgress, Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useLayout } from "../../Layout/LayoutContext";
import { discussionService, submissionsService } from "../../Utils/ApiService";
import DiscussionThread from "../../Components/DiscussionThread";
import { Thread } from "../../Types/discussion";

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
  const [discussion, setDiscussion] = useState<Thread | undefined>();

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

  useEffect(() => {
    isAuthenticated &&
      discussionService.get(
        "/thread",
        {
          channel: `${user?.sub}${taskId}`,
          channelType: "correction",
        },
        {
          success: setDiscussion,
          error: () => {},
        }
      );
    // eslint-disable-next-line
  }, [isAuthenticated, taskId]);

  return (
    <>
      <br />
      <Typography variant="h6">Výplata</Typography>
      <br />
      <div className={classes.flex}>
        <LinearProgress
          className={classes.progress}
          value={Math.min(100, (100 * results) / maxPoints)}
          color="primary"
          variant="determinate"
        />
        <Typography style={{ minWidth: 52 }}>
          {results} / {maxPoints}
        </Typography>
      </div>
      <br />
      <br />
      <Typography variant="h6">Komentář k opravení</Typography>
      <br />
      <br />
      {discussion && <DiscussionThread thread={discussion} setThread={() => {}} />}
    </>
  );
}
