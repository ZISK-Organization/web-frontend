import React, { useState, useEffect } from "react";
import { Card, createStyles, makeStyles, Theme, CardContent, CardHeader, Typography } from "@material-ui/core";
import { commonModuleMeta, fileModuleMeta, textModuleMeta } from "../../../Types/taskTypes";
import { submissionsService, tasksService } from "../../../Utils/ApiService";
import { useLayout } from "../../../Layout/LayoutContext";
import FileModule from "./FileModule";
import TextModule from "./TextModule";
import { toStringDigits } from "../../../Utils/Common";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from "@material-ui/lab";

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
  const { isAuthenticated, user } = useAuth0();
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

  const moduleId = taskId.toString() + toStringDigits(moduleNumber, 2);

  const submit = (
    callback: (res: string) => void,
    submission: string,
    moduleType: string,
    moduleSection?: number,
    moduleDetails?: string
  ) => {
    user &&
      submissionsService.post(
        moduleSection === undefined ? "submitModule" : "submitModuleSection",
        {
          moduleId: moduleId,
          moduleDetails: moduleDetails,
          userId: user.sub,
          moduleType: moduleType,
          moduleSection: moduleSection,
        },
        submission,
        {
          success: callback,
          error: () => layout.error("Při ukládání došlo k chybě, zkuste to prosím později."),
        }
      );
  };

  return (
    (isAuthenticated &&
      user &&
      user.sub &&
      ((module && (
        <>
          <Card>
            <CardHeader className={classes.header} title={module.name} />
            <CardContent>
              <Typography color="textSecondary">{module.introText}</Typography>
              <br />
              {module.type === "text" ? (
                <TextModule userId={user.sub} moduleId={moduleId} submit={submit} module={module as textModuleMeta} />
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
      )) || <>TODO: some fancy loading</>)) || (
      <>
        <Alert severity="warning">Pro odevzdávání řešení se musíš přihlásit</Alert>
        <br />
      </>
    )
  );
}
