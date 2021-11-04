import React /*, { useState }*/ from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Grid,
  // useTheme,
  // Card,
  // CardActionArea,
  // CardMedia,
  // CardContent,
  // IconButton,
} from "@material-ui/core";
// import useWindowDimensions from "../../Hooks/GetWindowDimensions";
// import SwipeableViews from "react-swipeable-views";
// import { ChevronRight, ChevronLeft } from "@material-ui/icons";
// import news from "../../Data/Mock/News.json";
import team from "../../Data/Team.json";
import TeamMemberCard from "./TeamMemberCard";
import DataCard from "../../Components/DataCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: { width: "80%", marginLeft: "10%" },
    actualitiesContainer: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    newsContainer: {
      width: "90%",
      marginLeft: "5%",
    },
    newsImage: {
      height: 256,
    },
    newsCard: {
      margin: theme.spacing(3),
      height: `calc(100% - ${2 * theme.spacing(3)}px)`,
    },
    newsArrow: {
      color: theme.palette.primary.contrastText,
    },
    cardContainer: {
      padding: theme.spacing(3),
    },
  })
);

export default function Home() {
  const classes = useStyles();
  // const theme = useTheme();
  // const [newsPage, setNewsPage] = useState(0);
  // const { width } = useWindowDimensions();

  // const newsPerPage = width <= theme.breakpoints.width("md") ? 1 : width <= theme.breakpoints.width("lg") ? 2 : 3;
  // const newsPages = Math.ceil(news.length / newsPerPage);

  return (
    <>
      <Container maxWidth="xl">
        <br />
        <br />
        <img className={classes.logo} src="/img/logo_large.svg" alt="logo" />
        <br />
        <br />
        <Typography variant="h2" align="center">
          Zábavné informatické soutěžní klání
        </Typography>
      </Container>
      <br />
      <br />
      {/* <div className={classes.actualitiesContainer}>
        <Container maxWidth="xl">
          <br />
          <Typography variant="h4" align="center">
            Aktuálně
          </Typography>
          <br />
          <div style={{ display: "flex" }}>
            <IconButton
              className={classes.newsArrow}
              aria-label="left"
              onClick={() => setNewsPage((newsPage - 1 + newsPages) % newsPages)}
            >
              <ChevronLeft />
            </IconButton>

            <SwipeableViews index={newsPage} onChangeIndex={setNewsPage}>
              {Array.from(Array(newsPages)).map((_, i) => (
                <Grid container className={classes.newsContainer}>
                  {news
                    .slice()
                    .reverse()
                    .slice(i * newsPerPage, Math.min(news.length, (i + 1) * newsPerPage))
                    .map((n, i) => (
                      <Grid item xs={12} md={6} lg={4} key={i}>
                        <Card className={classes.newsCard}>
                          <CardActionArea>
                            <CardMedia image={n.image} className={classes.newsImage} />
                            <CardContent>
                              <Typography variant="body2" color="textSecondary">
                                {new Date(n.date).toLocaleDateString()}
                              </Typography>
                              <br />
                              <Typography align="center" gutterBottom variant="h5" component="h2">
                                {n.title}
                              </Typography>
                              <Typography align="justify" variant="body2" color="textSecondary" component="p">
                                {n.shortText}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              ))}
            </SwipeableViews>
            <IconButton
              className={classes.newsArrow}
              aria-label="right"
              onClick={() => setNewsPage((newsPage + 1) % newsPages)}
            >
              <ChevronRight />
            </IconButton>
          </div>
        </Container>
      </div>
     */}
      <br />
      <br />
      <br />
      <br />
      <DataCard
        image="/img/Homepage/allFields.png"
        text="Informatika je široký obor, ve kterém se na vyšší úrovni každý specializuje na něco jiného, a přijde nám škoda zaměřovat se čistě na algoritmizaci či úplné základy a opomíjet mnohé zajímavé disciplíny jako je kyberbezpečnost, procesory, architektura operačních systémů, umělá inteligence, bioinformatika, či kvantové programování. Věříme, že je mnoho studentů s talentem pro různé oblasti této vědy, a chceme jim pomoci ho rozvíjet. V naší soutěži tedy budete mít možnost si vyzkoušet úlohy ze všech možných oborů informatiky, matematiky a elektrotechniky a to nejen softwareově na vašem počítači, ale i s fyzickým hardwarem."
        orientation="standard"
        title="Tematická pestrost úloh"
        theme="dark"
      />
      <DataCard
        image="/img/Homepage/languages.png"
        text="Nebudeme vám vnucovat žádný konkrétní postup, operační systém ani programovací jazyk (pokud zrovna není přímo tématem úlohy), aby měli jednak možnost úlohu řešit nejpohodlnějším způsobem, jednak možnost zvolit obtížnější způsob (např. exotický programovací jazyk) ke zdokonalení vlastních schopností."
        orientation="reversed"
        title="Individuální přístup"
        theme="light"
      />
      <DataCard
        image="/img/Homepage/difs.png"
        text="I v praxi se vyskytují úkoly vyžadující různou míru znalostí a inteligence, proto i zde chceme připravit co nejvíce úrovní obtížnosti úloh, aby si každý, kdo už má nějaké povědomí o informatice, mohl najít tu odpovídající jeho současným schopnostem a dovednostem. V každém výplatním období jsou úlohy 4 obtížností, z nichž nejjednodušší úlohu by měl zvládnout každý, kdo někdy jen trochu programoval, zatímco nejtěžší představuje skutečnou výzvu i pro většinu vysokoškolských studentů."
        orientation="standard"
        title="Rozsah obtížnosti úloh"
        theme="dark"
      />
      <DataCard
        image="/img/Homepage/memes.jpg"
        text="Máme memes!!! Přímo na našich stránkách naleznete platformu, kde budete moct sdílet či sledovat spoustu skvělých memes spojených nejen se soutěží, které si pro vás jak organizátoři tak ostatní účastníci nachystali."
        orientation="reversed"
        title="Memes"
        theme="light"
      />
      <DataCard
        image="/img/Homepage/party.png"
        text="I když se snažíme, aby byly úlohy co nejkvalitnější, není to nejpodstatnější součást soutěže, tou je poznávání nových lidí skrz sdílené aktivity. Proto také obsahují stránky pro odlehčení feed s informatickými memy a k soutěži patří společné akce, ať už pořádané fyzicky či ve virtuálním prostoru."
        orientation="standard"
        title="Kontakt i mimo úlohy"
        theme="dark"
      />
      <br />
      <br />
      <Container maxWidth="xl">
        <Grid container>
          {team.map((t, i) => (
            <Grid className={classes.cardContainer} key={i} item xs={12} md={6} lg={4}>
              <TeamMemberCard
                photo={t.photo}
                name={t.name}
                age={5}
                motto={t.motto}
                email={t.email}
                github={t.github}
                about={t.about}
                web={undefined}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
