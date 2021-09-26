import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { tasksService } from "../../Utils/ApiService";
import { useLayout } from "../../Layout/LayoutContext";
import Module from "./Modules/Module";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iframe: {
      border: "none",
      width: "100%",
    },
  })
);

interface IProps {
  taskId: string;
  modules: number;
  deadline: Date;
  isTutorial: boolean;
}

export default function Assignment({ taskId, modules, deadline, isTutorial }: IProps) {
  const classes = useStyles();
  const [frameHeight, setFrameHeight] = useState("0px");
  const [content, setContent] = useState("");
  const layout = useLayout();

  const { isAuthenticated, user } = useAuth0();

  //@ts-ignore
  const isAdmin = isAuthenticated && user["https://zisk-go.com/roles"].includes("admin");

  useEffect(() => {
    tasksService.get(
      isTutorial ? "/files/tutorialAssignment" : isAdmin ? "/files/admin/assignment" : "/files/assignment",
      { taskId: taskId },
      {
        success: setContent,
        error: () => layout.error("Při načítání zadání úlohy došlo k chybě"),
      }
    );
    //eslint-disable-next-line
  }, [taskId]);

  const iframeReady = () => {
    let iframe = document.getElementById("assignmentIframe") as HTMLIFrameElement;
    //@ts-ignore
    let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWin.document.body)
      setFrameHeight((iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + " px");
  };

  return (
    <>
      <iframe
        id="assignmentIframe"
        onLoad={iframeReady}
        className={classes.iframe}
        title="taskAssignment"
        height={frameHeight}
        srcDoc={`<html>
                    <head>
                        <link rel="stylesheet" href="/css/assignmentStyles.css" />
                    </head>
                <body>
                    ${content}
                    </body>
                </html>`}
      />
      <br />
      {Array.from(new Array(modules)).map((_, i) => (
        <Module deadline={deadline} key={i} taskId={taskId} moduleNumber={i} />
      ))}
    </>
  );
}
