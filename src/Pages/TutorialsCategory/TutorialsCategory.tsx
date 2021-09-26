import React from "react";
import { Container, Typography } from "@material-ui/core";
import seriesDescription from "../../Data/Mock/TutorialsSeries.json";
import TutorialsSeries from "./TutorialSeries";

interface IProps {
  categoryId: string;
}

export default function TutorialsCategory({ categoryId }: IProps) {
  //@ts-ignore
  const series = seriesDescription[categoryId] || [];

  return (
    <Container maxWidth="xl">
      {series.length > 0 ? (
        series.map((s: { name: string; id: string }) => (
          <TutorialsSeries categoryId={categoryId} name={s.name} seriesId={s.id} key={s.id} />
        ))
      ) : (
        <Typography>V této kategorii nebyly zveřejněny žádné tutoriály</Typography>
      )}
    </Container>
  );
}
