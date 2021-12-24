import React from "react";
import { Container, Typography } from "@material-ui/core";

export default function About() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4">O soutěži</Typography>
      <br />
      <Typography>
        Zábavné Informatické Super Klání (ZISK) je internetová informatická soutěž určená primárně studentům středních škol a
        bakalářského studia vysokých škol. Řešit tedy může kdokoliv, ale úlohy jsou optimalizované pro tuto cílovou skupinu. Při
        tvorbě úloh se snažíme držet filosofie vyjádřené následujícími body...
      </Typography>
      <br />
      <Typography variant="h6">Nejsme seminář pro úplné začátečníky</Typography>
      <br />
      <Typography>
        Tuto úlohu už úspěšně plní jiné soutěže, nedává tedy velký smysl vydávat na toto další práci navíc.
      </Typography>
      <br />
      <Typography variant="h6">Rozsah obtížnosti úloh</Typography>
      <br />
      <Typography>
        I v praxi se vyskytují úkoly vyžadující různou míru znalostí a inteligence, proto i zde chceme připravit co nejvíce
        úrovní obtížnosti úloh, aby si každý, kdo už má nějaké povědomí o informatice, mohl najít tu odpovídající jeho současným
        schopnostem a dovednostem.
      </Typography>
      <br />
      <Typography variant="h6">Tematická pestrost úloh</Typography>
      <br />
      <Typography>
        Informatika je široký obor, ve kterém se na vyšší úrovni každý specializuje na něco jiného, a přijde nám škoda zaměřovat
        se čistě na algoritmizaci či úplné základy a opomíjet mnohé zajímavé disciplíny jako je kyberbezpečnost, procesory,
        architektura operačních systémů, umělá inteligence, bioinformatika, či kvantové programování. Věříme, že je mnoho
        studentů s talentem pro různé oblasti této vědy, a chceme jim pomoci ho rozvíjet.
      </Typography>
      <br />
      <Typography variant="h6">Prostor pro řešitelskou kreativitu a autonomii</Typography>
      <br />
      <Typography>
        Nechceme vnucovat řešitelům žádný konkrétní postup, operační systém ani programovací jazyk (pokud zrovna není přímo
        tématem úlohy), aby měli jednak možnost úlohu řešit nejpohodlnějším způsobem, jednak možnost zvolit obtížnější způsob
        (např. exotický programovací jazyk) ke zdokonalení vlastních schopností.
      </Typography>
      <br />
      <Typography variant="h6">Kontakt s organizátory i mezi soutěžícími navzájem mimo úlohy</Typography>
      <br />
      <Typography>
        I když se snažíme, aby byly úlohy co nejkvalitnější, není to nejpodstatnější součást soutěže, tou je poznávání nových
        lidí skrz sdílené aktivity. Proto také obsahují stránky pro odlehčení feed s informatickými memy a k soutěži patří
        společné akce, ať už pořádané fyzicky či ve virtuálním prostoru.
      </Typography>
      <br />
      <Typography>
        Soutěž se řeší ve čtyřech výplatních obdobích (sériích), přičemž každé výplatní období obsahuje čtyři úlohy čtyř
        obtížností za které můžete dostat výplatu až deseti bodů. Tento ročník je první, tudíž o konkrétních kritériích pro
        úspěšné řešitele či prioritě účasti na akcích bude rozhodnuto až podle zájmu a reálné míry obtížnosti úloh.
      </Typography>
      <br />
      <Typography variant="h4">Pravidla soutěže</Typography>
      <br />
      <Typography>Je zakázáno používat software a hrdware ZISKu k jinému účelu, než který byl zamýšlen.</Typography>
      <br />
      <Typography>Je zakázáno nahrávat škodlivý kód do odevzdávacích modulů.</Typography>
      <br />
      <Typography>
        Je zakázáno zveřejňovat na našich stránkách či odevzdávat do modulů libovolný obsah v rozporu se zákony České Republiky.
      </Typography>
      <br />
      <Typography>Je zakázáno při řešení úloh spolupracovat s jinými osobami, zejména s ostatními řešiteli.</Typography>
      <br />
      <Typography>
        NEBUŤ KOKOT - neurážej úmyslně ostatní řešitele či organizátory v diskuzích, nezveřejňuj řešení úloh či nápovědy před
        deadlinem, nehackuj naše servery (pokud k tomu není úloha určena) atd.
      </Typography>
    </Container>
  );
}
