import React /*, { useState }*/ from "react";
import { Container, Typography /*, useTheme , Hidden, Tabs, Tab, Select, MenuItem*/ } from "@material-ui/core";
// import MUIDataTable from "mui-datatables";
// import { round } from "../../Utils/Common";
// import useWindowDimensions from "../../Hooks/GetWindowDimensions";

export default function Results() {
  // const theme = useTheme();
  // const dims = useWindowDimensions();

  // const [tab, setTab] = useState(parseInt(localStorage.getItem("ResultsTab") || "0"));

  // const changeTab = (newVal: number) => {
  //   localStorage.setItem("ResultsTab", newVal.toString());
  //   setTab(newVal);
  // };

  // const isMobile = theme.breakpoints.width("sm") >= dims.width;

  // const columnDefinitions = [
  //   { name: "order", label: "Pořadí" },
  //   { name: "userName", label: "Jméno" },
  //   { name: "points", label: "Body" },
  //   { name: "tasksSolved", label: "Odevzdané úlohy", options: { display: !isMobile } },
  //   { name: "avgPerTask", label: "Ø Bodů za úlohu", options: { display: !isMobile } },
  // ];

  // const tabNames = ["Středoškoláci", "Vysokoškoláci", "Ostatní", "Všichni"];

  return (
    <Container maxWidth="xl">
      <br />
      <Typography>Výsledky budou zveřejněny po deadlinu první série.</Typography>
      <div style={{ height: "calc(100vh - 412px)" }}></div>
      {/* <Hidden xsDown>
        <Tabs value={tab} onChange={(_, newVal) => changeTab(newVal)} indicatorColor="primary" textColor="primary" centered>
          {tabNames.map((t) => (
            <Tab key={t} label={t} />
          ))}
        </Tabs>
      </Hidden>
      <Hidden smUp>
        <br />
        <Select value={tab} fullWidth color="primary" onChange={(e) => changeTab(e.target.value as number)}>
          {tabNames.map((t, i) => (
            <MenuItem key={t} value={i}>
              {t}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
      </Hidden>
      <br />
      <MUIDataTable
        title={tabNames[tab]}
        columns={columnDefinitions}
        data={data.map((d, i) => {
          return { ...d, avgPerTask: round(d.points / d.tasksSolved, 2), order: i + 1 };
        })}
        options={{
          selectableRows: "none",
          responsive: "standard",
          download: false,
          print: false,
          pagination: false,
        }}
      />
      <br />
      <br /> */}
    </Container>
  );
}
