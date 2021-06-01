import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Accordion,
  Typography,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { ExpandMore } from "@material-ui/icons";
import tasks from "../../Data/Mock/Tasks.json";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    seriesHeader: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: 8,
    },
  })
);

export default function Tasks() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container maxWidth="xl">
      <br />
      <br />
      {tasks.map((series, i) => (
        <React.Fragment key={i}>
          <Accordion defaultExpanded={!series.closed} style={{ borderRadius: 8 }}>
            <AccordionSummary className={classes.seriesHeader} expandIcon={<ExpandMore />}>
              <Typography>Sére {i + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {series.tasks.map((task) => (
                  <Grid item key={task.id} lg={3}>
                    <br />
                    <Card
                      onClick={() => {
                        history.push(`/Tasks/${task.id}`);
                      }}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            {task.name}
                          </Typography>
                          <Typography color="textSecondary">{new Date(task.deadline).toLocaleString()}</Typography>
                          <br />
                          <br />
                          <Rating color="primary" value={task.difficulty} readOnly max={4} />
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <br />
        </React.Fragment>
      ))}
    </Container>
  );
}
