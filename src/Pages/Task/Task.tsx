import React, { useState, useEffect } from "react";
import { Container, Typography, Tabs, Tab, Avatar } from "@material-ui/core";
import DiscussionThread from "../../Components/DiscussionThread";
import Results from "./Results";
import { taskMeta } from "../../Types/taskTypes";
import { useLayout } from "../../Layout/LayoutContext";
import { discussionService, profilesService, tasksService } from "../../Utils/ApiService";
import Assignment from "./Assignment";
import Solution from "./Solution";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../../Types/profiles";
import Flex from "../../Components/Flex";
import { Thread } from "../../Types/discussion";

interface IProps {
  taskId: string;
}

export default function Task({ taskId }: IProps) {
  const [tab, setTab] = useState(0);
  const [task, setTask] = useState<taskMeta | undefined>(undefined);
  const [author, setAuthor] = useState<User | undefined>();
  const [discussion, setDiscussion] = useState<Thread | undefined>();
  const layout = useLayout();

  const { isAuthenticated, user } = useAuth0();

  //@ts-ignore
  const isAdmin = isAuthenticated && user["https://zisk-go.com/roles"].includes("admin");

  const loadAuthor = (authorId: string) =>
    profilesService.get(
      "/",
      {
        userId: authorId,
      },
      {
        success: (profile: User) => {
          setAuthor(profile);
        },
        error: () => {},
      }
    );

  useEffect(() => {
    tasksService.get(
      "/admin/meta",
      { id: taskId },
      {
        success: (task: taskMeta) => {
          setTask(task);
          loadAuthor(task.authors[0]);
        },
        error: () => layout.error("Při načítání úlohy došlo k chybě."),
      }
    );
    // eslint-disable-next-line
  }, [taskId]);

  useEffect(() => {
    discussionService.get(
      "/thread",
      {
        channel: taskId,
        channelType: "task",
      },
      {
        success: setDiscussion,
        error: () => {},
      }
    );
  }, [taskId]);

  return (
    (task && (isAdmin || task.published) && (
      <Container maxWidth="xl">
        <br />
        <Typography variant="h3">{task.name}</Typography>
        <br />
        <Flex>
          {author === undefined ? (
            <Typography variant="subtitle1" component="span">
              {task.authors[0]}
            </Typography>
          ) : (
            <>
              <Avatar
                src={author.image}
                style={{ width: 56, height: 56, boxShadow: "2px 2px 4px #c4c4c4", marginRight: 18 }}
                sizes="large"
              />
              <div>
                <Typography variant="h6">
                  {author.name} {author.surname}
                </Typography>
                <Typography variant="subtitle1">{author.mail}</Typography>
              </div>
            </>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <Typography variant="subtitle1">
              <b>DEADLINE:</b> {new Date(task.deadline).toLocaleString()}
            </Typography>
            {new Date(task.deadline).getTime() > new Date().getTime() && (
              <Typography variant="subtitle1">
                Zbývá jetě {Math.floor((new Date(task.deadline).getTime() - new Date().getTime()) / 86400000)} d{" "}
                {Math.round(((new Date(task.deadline).getTime() - new Date().getTime()) % 86400000) / 3600000)} h
              </Typography>
            )}
          </div>
        </Flex>
        <br />
        <br />
        <Tabs value={tab} onChange={(_, val) => setTab(val)} indicatorColor="primary" textColor="primary">
          <Tab label="Zadání" />
          <Tab label="Diskuze" />
          <Tab label="Hodnocení" />
          {(new Date(task.deadline).getTime() < new Date().getTime() || isAdmin) && <Tab label="Vzorové řešení" />}
        </Tabs>
        <br />
        {tab === 0 ? (
          <Assignment deadline={new Date(task.deadline)} taskId={taskId} modules={task.modules} />
        ) : tab === 1 ? (
          discussion === undefined ? (
            <Typography>Načítám data</Typography>
          ) : (
            <DiscussionThread thread={discussion} setThread={setDiscussion} />
          )
        ) : tab === 2 ? (
          <>
            <Results maxPoints={task.maxPoints} taskId={taskId} />
          </>
        ) : (
          <Solution taskId={taskId} />
        )}
      </Container>
    )) || <></>
  );
}
