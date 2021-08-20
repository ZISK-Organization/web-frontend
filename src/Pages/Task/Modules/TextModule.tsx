import React, { useEffect, useState } from "react";
import { Grid, Button, TextField, Tooltip } from "@material-ui/core";
import { textModuleMeta } from "../../../Types/taskTypes";
import { useLayout } from "../../../Layout/LayoutContext";
import { submissionsService } from "../../../Utils/ApiService";
import { CheckCircle, HighlightOff } from "@material-ui/icons";

interface IProps {
  module: textModuleMeta;
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

export default function TextModule({ module, submit, userId, moduleId }: IProps) {
  const [answers, setAnswers] = useState(module.questions.map((q) => ""));
  const [submissions, setSubmissions] = useState<{ moduleSection: number; submission: string; correctionDetails: string }[]>(
    []
  );
  const layout = useLayout();

  useEffect(() => {
    submissionsService.get(
      "/lastSubmissions",
      {
        moduleId: moduleId,
        userId: userId,
      },
      {
        success: (data: { moduleSection: number; submission: string; correctionDetails: string }[]) => {
          const newAnswers = [...answers];
          data.forEach((d) => (newAnswers[d.moduleSection] = d.submission));
          setAnswers(newAnswers);
          setSubmissions(data);
        },
        error: () => layout.error("Při načítání posledních odevzdání došlo k chybě"),
      }
    );

    //eslint-disable-next-line
  }, [userId, moduleId]);

  const changeAnswer = (newAnswer: string, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = newAnswer;
    setAnswers(newAnswers);
  };

  return (
    <>
      <Grid container spacing={3}>
        {module.questions.map((q, i) => (
          <React.Fragment key={i}>
            <Grid item xs={12} md={module.variant === "separate" ? 10 : 12}>
              <TextField value={answers[i]} onChange={(e) => changeAnswer(e.target.value, i)} fullWidth label={q.question} />
            </Grid>
            {module.variant === "separate" && (
              <Grid item xs={12} md={2}>
                <Button
                  color="primary"
                  disabled={answers[i].length === 0}
                  onClick={() =>
                    submit(
                      (result) => {
                        if (result === "correct") layout.success("Tvé řešení je správné.");
                        else layout.warning("Tvé řešení není správně");

                        setSubmissions([
                          ...submissions.filter((s) => s.moduleSection !== i),
                          { correctionDetails: result, moduleSection: i, submission: answers[i] },
                        ]);
                      },
                      answers[i],
                      "text",
                      i
                    )
                  }
                >
                  Odevzdat
                </Button>
                {submissions.filter((s) => s.moduleSection === i).length > 0 && (
                  <>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    {submissions.filter((s) => s.moduleSection === i)[0].correctionDetails === "correct" ? (
                      <Tooltip title="Poslední odevzdané řešení je správné">
                        <CheckCircle style={{ color: "green" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Poslední odevzdané řešení není správné">
                        <HighlightOff style={{ color: "darkRed" }} />
                      </Tooltip>
                    )}
                  </>
                )}
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
      <br />
      {module.variant !== "separate" && <Button color="primary">Odevzdat</Button>}
    </>
  );
}
