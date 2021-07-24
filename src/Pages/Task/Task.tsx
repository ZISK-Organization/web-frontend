import React, { useState, useEffect } from "react";
import { Container, Typography, Tabs, Tab } from "@material-ui/core";
import thread from "../../Data/Mock/DiscussionThread.json";
import DiscussionThread from "../../Components/DiscussionThread";
import Results from "./Results";
import { taskMeta } from "../../Types/taskTypes";
import { useLayout } from "../../Layout/LayoutContext";
import { tasksService } from "../../Utils/ApiService";
import Assignment from "./Assignment";
import Solution from "./Solution";

interface IProps {
  taskId: string;
}

export default function Task({ taskId }: IProps) {
  const [tab, setTab] = useState(0);
  const [task, setTask] = useState<taskMeta | undefined>(undefined);
  const layout = useLayout();

  useEffect(() => {
    tasksService.get(
      "/admin/meta",
      { id: taskId },
      {
        success: (task: taskMeta) => {
          setTask(task);
        },
        error: () => layout.error("Při načítání úlohy došlo k chybě."),
      }
    );
    // eslint-disable-next-line
  }, [taskId]);

  return (
    (task && (
      <Container maxWidth="xl">
        <br />
        <Typography variant="h3">{task.name}</Typography>
        <br />
        <Typography variant="subtitle1" component="span">
          <b>AUTOR:</b> {task.authors[0]}
        </Typography>
        <Typography variant="subtitle1" component="span">
          &nbsp;&nbsp;&nbsp;&nbsp;<b>DEADLINE:</b> {new Date(task.deadline).toLocaleString()}
        </Typography>
        <br />
        <br />
        <Tabs value={tab} onChange={(_, val) => setTab(val)} indicatorColor="primary" textColor="primary">
          <Tab label="Zadání" />
          <Tab label="Diskuze" />
          <Tab label="Hodnocení" />
          <Tab label="Vzorové řešení" />
        </Tabs>
        <br />
        {tab === 0 ? (
          <Assignment taskId={taskId} modules={task.modules} />
        ) : tab === 1 ? (
          <>
            <DiscussionThread thread={thread} />
          </>
        ) : tab === 2 ? (
          <>
            <Results maxPoints={task.maxPoints} results={2} />
          </>
        ) : (
          <Solution taskId={taskId} />
        )}
      </Container>
    )) || <></>
  );
}
