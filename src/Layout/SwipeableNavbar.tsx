import React from "react";
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText /*Avatar, Dialog*/, Avatar } from "@material-ui/core";
import {
  Person,
  AssignmentTurnedIn,
  MenuBook,
  Image,
  FormatListNumbered,
  Info,
  Archive,
  Message,
  Group,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useStyles = makeStyles({
  list: {
    width: 240,
  },
});

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loginWithRedirect: () => void;
  user?: {
    picture?: string;
    name?: string;
  };
  isAuthenticated: boolean;
}

export default function RightDrawer({ open, setOpen, isAuthenticated, loginWithRedirect, user }: IProps) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <SwipeableDrawer anchor="right" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
      <List className={classes.list} style={{ flexGrow: 1 }}>
        <ListItem button onClick={() => history.push("/Tasks")}>
          <ListItemIcon>
            <AssignmentTurnedIn />
          </ListItemIcon>
          <ListItemText primary="Úlohy" />
        </ListItem>
        <ListItem button onClick={() => history.push("/Tutorials")}>
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="Tutoriály" />
        </ListItem>
        <ListItem button onClick={() => history.push("/Memes")}>
          <ListItemIcon>
            <Image />
          </ListItemIcon>
          <ListItemText primary="Memes" />
        </ListItem>
        <ListItem button onClick={() => history.push("/Results")}>
          <ListItemIcon>
            <FormatListNumbered />
          </ListItemIcon>
          <ListItemText primary="Výsledky" />
        </ListItem>
        <ListItem button onClick={() => history.push("/About")}>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="O soutěži" />
        </ListItem>
        <ListItem button onClick={() => history.push("/Archive")}>
          <ListItemIcon>
            <Archive />
          </ListItemIcon>
          <ListItemText primary="Archív" />
        </ListItem>
        <ListItem button onClick={() => history.push("/Articles")}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Akce" />
        </ListItem>
        <ListItem button onClick={() => window.open("https://discord.gg/Jpb9vw3hFv", "_blank")}>
          <ListItemIcon>
            <Message />
          </ListItemIcon>
          <ListItemText primary="Discord" />
        </ListItem>
        {/* <ListItem button onClick={() => history.push("/Discussion")}>
          <ListItemIcon>
            <Forum />
          </ListItemIcon>
          <ListItemText primary="Diskuze" />
        </ListItem> */}
        <hr />
        {isAuthenticated ? (
          <ListItem button onClick={() => history.push("/Profile")}>
            <ListItemIcon>
              <Avatar src={user?.picture} />
            </ListItemIcon>
            <ListItemText primary={user?.name} />
          </ListItem>
        ) : (
          <ListItem button onClick={loginWithRedirect}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Přihlásit se" />
          </ListItem>
        )}
      </List>
    </SwipeableDrawer>
  );
}
