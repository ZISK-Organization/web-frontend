import React /*, { useState }*/ from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
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
import HomeRoutingIcon from "../../Components/HomeRoutingIcon";
import { getThemeStoredCode } from "../../Utils/Common";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: "100vw",
      backgroundImage: "url(/img/intro.png)",
      backgroundColor: "#540e04",
      height: "100vh",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      position: "absolute",
      backgroundPositionX: "center",
      zIndex: -2,
    },
    iconsPanel: {
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      bottom: 22,
      width: "100vw",
      zIndex: 1,
    },
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
      <div className={classes.logo}></div>
      <div className={classes.iconsPanel}>
        <HomeRoutingIcon image="/img/task.png" label="??lohy" src="/Tasks" />
        <HomeRoutingIcon image="/img/tut.png" label="Tutori??ly" src="/Tutorials" />
        <HomeRoutingIcon image="/img/meme.png" label="Memes" src="/Memes" />
        <HomeRoutingIcon image="/img/trophy.png" label="V??sledky" src="/Results" />
      </div>
      <div style={{ width: "1vw", height: "100vh", zIndex: -3 }}></div>
      {/* <div className={classes.actualitiesContainer}>
        <Container maxWidth="xl">
          <br />
          <Typography variant="h4" align="center">
            Aktu??ln??
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
      <DataCard
        image="/img/Homepage/allFields.png"
        text="Informatika je ??irok?? obor, ve kter??m se na vy?????? ??rovni ka??d?? specializuje na n??co jin??ho, a p??ijde n??m ??koda zam????ovat se ??ist?? na algoritmizaci ??i ??pln?? z??klady a opom??jet mnoh?? zaj??mav?? discipl??ny jako je kyberbezpe??nost, procesory, architektura opera??n??ch syst??m??, um??l?? inteligence, bioinformatika, ??i kvantov?? programov??n??. V??????me, ??e je mnoho student?? s talentem pro r??zn?? oblasti t??to v??dy, a chceme jim pomoci ho rozv??jet. V na???? sout????i tedy budete m??t mo??nost si vyzkou??et ??lohy ze v??ech mo??n??ch obor?? informatiky, matematiky a elektrotechniky a to nejen softwareov?? na va??em po????ta??i, ale i s fyzick??m hardwarem."
        orientation="standard"
        title="Tematick?? pestrost ??loh"
        theme="dark"
      />
      <DataCard
        image="/img/Homepage/languages.png"
        text="Nebudeme v??m vnucovat ????dn?? konkr??tn?? postup, opera??n?? syst??m ani programovac?? jazyk (pokud zrovna nen?? p????mo t??matem ??lohy), aby m??li jednak mo??nost ??lohu ??e??it nejpohodln??j????m zp??sobem, jednak mo??nost zvolit obt????n??j???? zp??sob (nap??. exotick?? programovac?? jazyk) ke zdokonalen?? vlastn??ch schopnost??."
        orientation="reversed"
        title="Individu??ln?? p????stup"
        theme="light"
      />
      <DataCard
        image="/img/Homepage/difs.png"
        text="I v praxi se vyskytuj?? ??koly vy??aduj??c?? r??znou m??ru znalost?? a inteligence, proto i zde chceme p??ipravit co nejv??ce ??rovn?? obt????nosti ??loh, aby si ka??d??, kdo u?? m?? n??jak?? pov??dom?? o informatice, mohl naj??t tu odpov??daj??c?? jeho sou??asn??m schopnostem a dovednostem. V ka??d??m v??platn??m obdob?? jsou ??lohy 4 obt????nost??, z nich?? nejjednodu?????? ??lohu by m??l zvl??dnout ka??d??, kdo n??kdy jen trochu programoval, zat??mco nejt???????? p??edstavuje skute??nou v??zvu i pro v??t??inu vysoko??kolsk??ch student??."
        orientation="standard"
        title="Rozsah obt????nosti ??loh"
        theme="dark"
      />
      <DataCard
        image="/img/Homepage/memes.jpg"
        text="M??me memes!!! P????mo na na??ich str??nk??ch naleznete platformu, kde budete moct sd??let ??i sledovat spoustu skv??l??ch memes spojen??ch nejen se sout??????, kter?? si pro v??s jak organiz??to??i tak ostatn?? ????astn??ci nachystali."
        orientation="reversed"
        title="Memes"
        theme="light"
      />
      <DataCard
        image="/img/Homepage/party.png"
        text="I kdy?? se sna????me, aby byly ??lohy co nejkvalitn??j????, nen?? to nejpodstatn??j???? sou????st sout????e, tou je pozn??v??n?? nov??ch lid?? skrz sd??len?? aktivity. Proto tak?? obsahuj?? str??nky pro odleh??en?? feed s informatick??mi memy a k sout????i pat???? spole??n?? akce, a?? u?? po????dan?? fyzicky ??i ve virtu??ln??m prostoru."
        orientation="standard"
        title="Kontakt i mimo ??lohy"
        theme="dark"
      />

      <Container
        maxWidth="xl"
        style={{ position: "relative", zIndex: 10, backgroundColor: getThemeStoredCode() === "light" ? "white" : "#212121" }}
      >
        <br />
        <br />
        <Grid container>
          {team.map((t, i) => (
            <Grid className={classes.cardContainer} key={i} item xs={12} md={6} lg={4}>
              <TeamMemberCard
                photo={t.photo}
                name={t.name}
                age={new Date().getUTCFullYear() - new Date(t.birthDate).getUTCFullYear()}
                motto={t.motto}
                email={t.email}
                github={t.github}
                about={t.about}
                web={undefined}
              />
            </Grid>
          ))}
        </Grid>
        <br />
      </Container>
    </>
  );
}
