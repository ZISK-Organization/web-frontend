import { Grid, Button, TextField } from "@material-ui/core";
import React from "react";
import { textModuleMeta } from "../../../Types/taskTypes";

interface IProps {
  module: textModuleMeta;
}

export default function TextModule({ module }: IProps) {
  return (
    <>
      <Grid container spacing={3}>
        {module.questions.map((q) => (
          <>
            <Grid item xs={12} md={module.variant === "separate" ? 10 : 12}>
              <TextField fullWidth label={q.question} />
            </Grid>
            {module.variant === "separate" && (
              <Grid item xs={12} md={2}>
                <Button color="primary">Odevzdat</Button>
              </Grid>
            )}
          </>
        ))}
      </Grid>
      <br />
      {module.variant !== "separate" && <Button color="primary">Odevzdat</Button>}
    </>
  );
}
