import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useLayout } from "../../Layout/LayoutContext";
import { tasksService } from "../../Utils/ApiService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iframe: {
      border: "none",
      width: "100%",
      overflowY: "hidden",
    },
  })
);

interface IProps {
  taskId: string;
}

export default function Solution({ taskId }: IProps) {
  const classes = useStyles();

  const [frameHeight, setFrameHeight] = useState("0px");
  const [content, setContent] = useState("");
  const layout = useLayout();

  useEffect(() => {
    tasksService.get(
      "/files/",
      { location: `tasks/${taskId}`, file: "solution.html" },
      {
        success: setContent,
        error: () => layout.error("Při načítání řešení úlohy došlo k chybě"),
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
    </>
  );
}
