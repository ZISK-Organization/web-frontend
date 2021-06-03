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
  Avatar,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { ExpandMore } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import tasks from "../../Data/Mock/Tasks.json";
import categories from "../../Data/TaskCategories.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    seriesHeader: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: 8,
    },
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      "&>*": {
        margin: 4,
      },
    },
    legendCard: {
      marginRight: theme.spacing(3),
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
      <Grid container direction="row-reverse">
        <Grid item lg={9} xs={12}>
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
                              <div className={classes.iconsContainer}>
                                {task.categories.map((cat) => (
                                  <Tooltip title={categories.filter((c) => c.id === cat)[0].name} key={cat}>
                                    <Avatar sizes="small" src={categories.filter((c) => c.id === cat)[0].icon} />
                                  </Tooltip>
                                ))}
                              </div>
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
        </Grid>
        <Hidden lgUp>
          <Grid item lg={12} md={6} xs={12}>
            &nbsp;
          </Grid>
        </Hidden>
        <Grid item lg={3} md={6} xs={12}>
          <Card className={classes.legendCard}>
            <CardContent>
              <Typography variant="h6">Kategorie úloh</Typography>
              <br />
              {categories.map((cat) => (
                <div key={cat.id} className={classes.iconsContainer}>
                  <Avatar sizes="small" src={cat.icon} /> <Typography> {cat.name}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
