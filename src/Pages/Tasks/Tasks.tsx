import React, { useEffect, useState } from "react";
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
import categories from "../../Data/TaskCategories.json";
import { series } from "../../Types/taskTypes";
import { useLayout } from "../../Layout/LayoutContext";
import { tasksService } from "../../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import { Skeleton } from "@material-ui/lab";

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
  const layout = useLayout();
  const { isAuthenticated, user } = useAuth0();

  //@ts-ignore
  const isAdmin = isAuthenticated && user["https://zisk-go.com/roles"].includes("admin");

  const [tasks, setTasks] = useState<series[]>([]);

  useEffect(
    () => {
      layout.setIsLoading(true);
      tasksService.get(
        isAdmin ? "/admin/year" : "/year",
        {},
        {
          success: (data: series[]) => {
            setTasks(data);
            layout.setIsLoading(false);
          },
          error: () => {
            layout.error("Při načítání úloh došlo k chybě, zkuste to prosím později");
            layout.setIsLoading(false);
          },
        }
      );
    },
    //eslint-disable-next-line
    [isAdmin]
  );

  return (
    <Container maxWidth="xl">
      <br />
      <br />
      <Grid container direction="row-reverse">
        <Grid item lg={9} xs={12}>
          {layout.isLoading && (
            <>
              <Skeleton variant="rect" height={60} style={{ borderRadius: 8 }} />
              <br />
              <Card>
                <CardContent style={{ paddingBottom: 0 }}>
                  <Grid container spacing={3} style={{ paddingBottom: 0 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <Grid item key={i} lg={3} style={{ paddingBottom: 0 }}>
                        <Skeleton height={320} />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </>
          )}
          {tasks.map((series) => (
            <React.Fragment key={series.seriesNumber}>
              <Accordion defaultExpanded={series.seriesNumber === tasks.length} style={{ borderRadius: 8 }}>
                <AccordionSummary className={classes.seriesHeader} expandIcon={<ExpandMore />}>
                  <Typography>{series.seriesNumber}. výplatní období</Typography>
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
                                {task.category.map((cat) => (
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
          <br />
        </Grid>
      </Grid>
    </Container>
  );
}
