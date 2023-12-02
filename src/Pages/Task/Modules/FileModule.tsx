import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, Typography, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { fileModuleMeta } from "../../../Types/taskTypes";
import { useLayout } from "../../../Layout/LayoutContext";
import { apiUrl, submissionsService, tasksService } from "../../../Utils/ApiService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    fileLink: {
      cursor: "pointer",
      textDecoration: "underline",
      color: "#0275d8",
    },
  })
);

interface IProps {
  module: fileModuleMeta;
  submit: (
    callback: (res: string) => void,
    submission: string,
    moduleType: string,
    moduleSection?: number,
    moduleDetails?: string
  ) => void;
  userId: string;
  moduleId: string;
}

export default function FileModule({ module, submit, userId, moduleId }: IProps) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [submittedFiles, setSubmittedFiles] = useState<{ name: string; url: string }[]>([]);
  const [dropZoneFiles, setDropZoneFiles] = useState<File[]>([]);
  const layout = useLayout();

  useEffect(() => {
    submissionsService.get(
      "lastSubmissions",
      { moduleId: moduleId, userId: userId },
      {
        success: (data: { submission: string }[]) =>
          data.length > 0 && setSubmittedFiles(data[0].submission.split(";").map(fileNameToFileInfo)),
        error: () => layout.error("Při načítání odevzdaných souborů došlo k chybě"),
      }
    );
    // eslint-disable-next-line
  }, [moduleId, userId]);

  const fileNameToFileInfo = (fn: string) => {
    return {
      name: fn.substring(1 + fn.lastIndexOf("-")),
      url: `${apiUrl}tasks/files/getSubmittedFile?fileName=${encodeURIComponent(fn)}`,
    };
  };

  const uploadFiles = (index: number, fileNames: string[]) => {
    if (index >= (dropZoneFiles?.length || 0)) {
      submit(
        () => {
          setSubmittedFiles(fileNames.map(fileNameToFileInfo));
          setLoading(false);
          layout.success("Tvé řešení bylo úspěšně odevzdáno");
        },
        fileNames.join(";"),
        "file"
      );
    } else
      tasksService.uploadFile(
        "/files/uploadSolution",
        dropZoneFiles[index],
        {
          moduleId: moduleId,
          userId: userId,
          type: dropZoneFiles[index].type.includes("txt") ? "text" : "binary",
        },
        {
          success: (name: string) => uploadFiles(index + 1, [...fileNames, name]),
          error: () => layout.error("Při nahrávání souborů došlo k chybě."),
        }
      );
  };

  const upload = () => {
    if (dropZoneFiles === undefined || dropZoneFiles.length === 0) {
      layout.warning("Nevybrali jste žádné soubory k nahrání");
    } else {
      setLoading(true);
      uploadFiles(0, []);
    }
  };

  return (
    <>
      <Typography>Odevzdané soubory</Typography>
      {/*TODO file icon*/}
      {submittedFiles.map((sf, i) => (
        <Typography key={i} className={classes.fileLink}>
          <a href={sf.url}>{sf.name}</a>
        </Typography>
      ))}
      <br />
      <DropzoneArea
        onChange={(files) => setDropZoneFiles(files)}
        maxFileSize={module.maxFileSize}
        filesLimit={module.filesLimit}
        showAlerts={["error", "info"]}
      />
      <br />
      <Button disabled={loading} color="primary" onClick={upload}>
        {loading ? <>Odevzdávám</> : <>Odevzdat</>}
      </Button>
    </>
  );
}
