import React, { useState, useEffect } from "react";
import { Card, createStyles, makeStyles, Theme, CardContent, CardHeader, Typography } from "@material-ui/core";
import { commonModuleMeta, fileModuleMeta, textModuleMeta } from "../../../Types/taskTypes";
import { tasksService } from "../../../Utils/ApiService";
import { useLayout } from "../../../Layout/LayoutContext";
import FileModule from "./FileModule";
import TextModule from "./TextModule";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  })
);

interface IProps {
  taskId: string;
  moduleNumber: number;
}

export default function Module({ taskId, moduleNumber }: IProps) {
  const classes = useStyles();
  const [module, setModule] = useState<commonModuleMeta | undefined>();
  const layout = useLayout();

  useEffect(
    () => {
      tasksService.get(
        "/admin/module",
        { taskId: taskId, moduleNumber: moduleNumber },
        {
          success: setModule,
          error: () => layout.error("Při načítání modulu " + moduleNumber + " došlo k chybě."),
        }
      );
    },
    //eslint-disable-next-line
    []
  );

  return (
    (module && (
      <>
        <Card>
          <CardHeader className={classes.header} title={module.name} />
          <CardContent>
            <Typography color="textSecondary">{module.introText}</Typography>
            <br />
            {module.type === "text" ? (
              <TextModule module={module as textModuleMeta} />
            ) : module.type === "file" ? (
              <FileModule module={module as fileModuleMeta} />
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
        <br />
        <br />
      </>
    )) || <>TODO: some fancy loading</>
  );
}
