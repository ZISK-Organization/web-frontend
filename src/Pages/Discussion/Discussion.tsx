import { Container, Typography } from "@material-ui/core";
import React from "react";

export default function Discussion() {
  return (
    <Container maxWidth="xl">
      <br />
      <Typography>
        Na obecné diskuzi stále pracujeme. Zatím prosím pište dotazy přímo k úlohám nebo kontaktujte přímo některého z
        organizátorů.
      </Typography>
      <div style={{ height: "calc(100vh - 412px)" }}></div>
    </Container>
  );
}
