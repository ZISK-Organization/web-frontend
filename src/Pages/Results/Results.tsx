import React, { useEffect, useState } from "react";
import { Container, useTheme, Hidden, Tabs, Tab, Select, MenuItem, Tooltip, IconButton } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { round } from "../../Utils/Common";
import useWindowDimensions from "../../Hooks/GetWindowDimensions";
import { User } from "../../Types/profiles";
import { getKeyExtractorReversedComparer } from "../../Utils/Comparers";
import { Result } from "../../Types/results";
import { reducers } from "../../Utils/Reducers";
import { useLayout } from "../../Layout/LayoutContext";
import { profilesService, submissionsService } from "../../Utils/ApiService";
import { History } from "@material-ui/icons";
import YearSelect, { currentYear } from "../../Components/YearSelect";

export default function Results() {
  const theme = useTheme();
  const dims = useWindowDimensions();

  const [tab, setTab] = useState(parseInt(localStorage.getItem("ResultsTab") || "3"));
  const [results, setResults] = useState<Result[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const layout = useLayout();

  const changeTab = (newVal: number) => {
    localStorage.setItem("ResultsTab", newVal.toString());
    setTab(newVal);
  };

  const reloadData = (year: number) => {
    layout.setIsLoading(true);
    submissionsService.get(
      "/results",
      { year: year % 100 },
      {
        success: (res: Result[]) => {
          setResults(res);
          layout.setIsLoading(false);
        },
        error: () => layout.error("Při načítání výsledků došlo k chybě"),
      }
    );
  };

  useEffect(() => {
    reloadData(currentYear);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    profilesService.get(
      "/all",
      {},
      {
        success: setUsers,
        error: console.log,
      }
    );
  }, []);

  const isMobile = theme.breakpoints.width("sm") >= dims.width;

  const columnDefinitions = [
    { name: "order", label: "Pořadí" },
    { name: "userName", label: "Jméno" },
    { name: "points", label: "Body" },
    { name: "tasksSolved", label: "Odevzdané úlohy", options: { display: !isMobile } },
    { name: "avgPerTask", label: "Ø Bodů za úlohu", options: { display: !isMobile } },
  ];

  const adminIds = ["github|10522096", "github|1266171", "google-oauth2|100845407094980221581"]; // TODO autoload
  const tabNames = ["Středoškoláci", "Vysokoškoláci", "Ostatní", "Všichni"];

  const filterUser = (userId: string) => {
    if (adminIds.includes(userId)) return false;
    if (tab === 3) return true;
    return [...users.filter((u) => u.id === userId), { category: -1 }][0].category === (tab + 1) % 3;
  };

  const getUserName = (userId: string) => {
    const { nickname, name, surname, finnished } = [
      ...users.filter((u) => u.id === userId),
      { name: userId, surname: "", nickname: "", finnished: false },
    ][0];
    if ((nickname || "").length > 0) return nickname;
    return `${name} ${surname}${finnished ? "" : " (Nekompletně vyplněný profil)"}`;
  };

  const data = results
    .filter((r) => filterUser(r.userId))
    .map((r) => {
      return {
        userName: getUserName(r.userId),
        userId: r.userId,
        points: Object.values(r.points).reduce(reducers.sum),
        tasksSolved: Object.keys(r.points).length,
        avgPerTask: round(Object.values(r.points).reduce(reducers.sum) / Object.keys(r.points).length, 2),
      };
    })
    .sort(getKeyExtractorReversedComparer("points"))
    .map((r, i) => {
      return { ...r, order: i + 1 };
    });

  return (
    <Container maxWidth="xl">
      <br />
      <Hidden xsDown>
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
        data={data}
        options={{
          customToolbar: () => (
            <YearSelect
              renderOpener={(onClick) => (
                <Tooltip title="Zobrazit historické výsledky">
                  <IconButton onClick={onClick}>
                    <History />
                  </IconButton>
                </Tooltip>
              )}
              onSelect={reloadData}
            />
          ),
          selectableRows: "none",
          responsive: "standard",
          download: false,
          print: false,
          pagination: false,
        }}
      />
      <br />
      <br />
    </Container>
  );
}
