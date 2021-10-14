import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, Container, Grid, TextField, Button, Slider, Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../../Types/profiles";
import { apiUrl, profilesService, tasksService } from "../../Utils/ApiService";
import { useLayout } from "../../Layout/LayoutContext";
import { openFileContext } from "../../Utils/Common";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      width: "80%",
      borderRadius: "50%",
      boxShadow: "2px 2px 4px #c4c4c4",
    },
    column: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  })
);

export default function Profile() {
  const classes = useStyles();
  const { isAuthenticated, user, logout } = useAuth0();

  const [profile, setProfile] = useState<User | undefined>();
  const layout = useLayout();

  useEffect(
    () => {
      if (isAuthenticated) {
        layout.setIsLoading(true);
        profilesService.get(
          "/",
          {
            userId: user?.sub,
          },
          {
            success: (profile: User) => {
              setProfile(profile);
              layout.setIsLoading(false);
            },
            error: () => {
              layout.error("Při načítání profilu došlo k chybě.");
              layout.setIsLoading(false);
            },
          }
        );
      }
    },
    // eslint-disable-next-line
    [isAuthenticated]
  );

  const isCompleted =
    profile &&
    (profile.name?.length || 0) > 0 &&
    (profile.surname?.length || 0) > 0 &&
    (profile.contactMail?.length || 0) > 0 &&
    (profile.highSchoolFinishYear || 0) > 1900 &&
    (profile.highSchoolFinishYear || 0) < 2100 &&
    (profile.category || -1) > 0 &&
    (profile.category || -1) < 4 &&
    (profile.name?.length || 0) > 0 &&
    (profile.city?.length || 0) > 0 &&
    (profile.street?.length || 0) > 0 &&
    (profile.zip?.length || 0) > 0 &&
    (profile.country?.length || 0) > 0;

  const saveChanges = () =>
    isCompleted &&
    profilesService.post("/", {}, profile, {
      success: () => layout.success("Profil byl úspěšně změněn."),
      error: () => layout.error("Při ukládání změn došlo k chybě."),
    });

  return isAuthenticated ? (
    <Container maxWidth="xl">
      <br />
      <br />
      {(profile && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} className={classes.column}>
            <img src={profile.image} alt="" className={classes.profile} />
            <br />
            <br />
            <Button
              color="primary"
              fullWidth
              onClick={() =>
                openFileContext(
                  (file: File[]) =>
                    file.length > 0 &&
                    tasksService.uploadFile(
                      "/files/uploadProfileImage",
                      file[0],
                      { userId: user?.sub },
                      {
                        success: (fileName) =>
                          setProfile({
                            ...profile,
                            image: `${apiUrl}tasks/files/getProfileImage?fileName=${encodeURIComponent(fileName)}`,
                          }),
                        error: () => layout.error("Při nahrávání došlo k chybě"),
                      }
                    )
                )
              }
            >
              Změnit obrázek
            </Button>
            <br />
            <br />

            <TextField
              label="Jméno"
              fullWidth
              color="primary"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <br />
            <TextField
              label="Příjmení"
              fullWidth
              color="primary"
              value={profile.surname || ""}
              onChange={(e) => setProfile({ ...profile, surname: e.target.value })}
            />
            <br />
            <TextField
              label="Přezdívka"
              fullWidth
              color="primary"
              value={profile.nickname || ""}
              onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <TextField label="Email" fullWidth color="primary" value={profile.mail || ""} disabled />
                <br />
                <br />
                <TextField
                  label="Kontaktní Email"
                  fullWidth
                  color="primary"
                  value={profile.contactMail || ""}
                  onChange={(e) => setProfile({ ...profile, contactMail: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  label="Rok maturity (předpokládaný)"
                  fullWidth
                  color="primary"
                  value={profile.highSchoolFinishYear || "2000"}
                  type="number"
                  onChange={(e) => setProfile({ ...profile, highSchoolFinishYear: parseInt(e.target.value) })}
                />
                <br />
                <br />
                <br />
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Button
                      color={profile.category === 1 ? "primary" : "secondary"}
                      onClick={() => setProfile({ ...profile, category: 1 })}
                      fullWidth
                    >
                      Středoškoláci
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Button
                      color={profile.category === 2 ? "primary" : "secondary"}
                      onClick={() => setProfile({ ...profile, category: 2 })}
                      fullWidth
                    >
                      Vysokoškoláci
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Button
                      color={profile.category === 3 ? "primary" : "secondary"}
                      onClick={() => setProfile({ ...profile, category: 3 })}
                      fullWidth
                    >
                      Ostatní
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      label="Město"
                      fullWidth
                      color="primary"
                      value={profile.city || ""}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="PSČ"
                      fullWidth
                      color="primary"
                      value={profile.zip || ""}
                      onChange={(e) => setProfile({ ...profile, zip: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <br />
                <TextField
                  label="Ulice a čp."
                  fullWidth
                  color="primary"
                  value={profile.street || ""}
                  onChange={(e) => setProfile({ ...profile, street: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  label="Stát"
                  fullWidth
                  color="primary"
                  value={profile.country || ""}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                />
                <br />
                <br />
                <br />
                <Typography>Pohlaví</Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography variant="caption">Muž</Typography>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      value={profile.sex}
                      onChange={(_, n) => setProfile({ ...profile, sex: n as number })}
                      min={0}
                      max={1}
                      step={0.01}
                      aria-labelledby="sex-slider"
                      color="primary"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Žena</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <br />
            <TextField
              multiline
              rows={8}
              label="O mně"
              fullWidth
              color="primary"
              variant="outlined"
              value={profile.aboutMe || ""}
              onChange={(e) => setProfile({ ...profile, aboutMe: e.target.value })}
            />
            <br />
            <br />

            <Button
              onClick={saveChanges}
              disabled={!isCompleted}
              color="primary"
              variant="contained"
              style={{ float: "right" }}
            >
              Uložit profil
            </Button>
            <Button onClick={() => logout({ returnTo: window.location.origin })} style={{ float: "right", marginRight: 12 }}>
              Odhlásit se
            </Button>
            {!isCompleted && (
              <>
                <br />
                <br />
                <Typography variant="caption" style={{ float: "right" }}>
                  Pro uložení profilu je nutné vyplnit všechny poviné údaje (vše až na přezdívku a O mně)
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      )) || <>Načítání profilu</>}
    </Container>
  ) : (
    <>Pro zobrazení stránky se musíš přihlásit</>
  );
}
