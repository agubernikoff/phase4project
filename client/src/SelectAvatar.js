import React from "react";
import ariel from "./resources/ariel.png";
import batman from "./resources/batman.png";
import bowser from "./resources/bowser.png";
import bulbasaur from "./resources/bulbasaur.png";
import captain_america from "./resources/captain_america.png";
import charmander from "./resources/charmander.png";
import flash from "./resources/flash.png";
import hulk from "./resources/hulk.png";
import human_torch from "./resources/human_torch.png";
import ironman from "./resources/ironman.png";
import kirby from "./resources/kirby.png";
import mario from "./resources/mario.png";
import megaman from "./resources/megaman.png";
import moana from "./resources/moana.png";
import nightcrawler from "./resources/nightcrawler.png";
import orange_ghost from "./resources/orange_ghost.png";
import pikachu from "./resources/pikachu.png";
import purple_ghost from "./resources/purple_ghost.png";
import red_monster from "./resources/red_monster.png";
import scarlet_witch from "./resources/scarlet_witch.png";
import spiderman from "./resources/spiderman.png";
import squirtle from "./resources/squirtle.png";
import storm from "./resources/storm.png";
import superman from "./resources/superman.png";
import thor from "./resources/thor.png";
import tiana from "./resources/tiana.png";
import tinkerbell from "./resources/tinkerbell.png";
import wolverine from "./resources/wolverine.png";
import wonder_woman from "./resources/wonder_woman.png";
import yoshi from "./resources/yoshi.png";

function SelectAvatar() {
  const avatars = [
    { src: ariel, name: "Ariel" },
    { src: batman, name: "Batman" },
    { src: bowser, name: "Bowser" },
    { src: bulbasaur, name: "Bulbasaur" },
    { src: captain_america, name: "Captain America" },
    { src: charmander, name: "Charmander" },
    { src: flash, name: "Flash" },
    { src: orange_ghost, name: "Ghost (orange)" },
    { src: purple_ghost, name: "Ghost (purple)" },
    { src: red_monster, name: "Horned Monster" },
    { src: hulk, name: "Hulk" },
    { src: human_torch, name: "Human Torch" },
    { src: ironman, name: "Ironman" },
    { src: kirby, name: "Kirby" },
    { src: mario, name: "Mario" },
    { src: megaman, name: "Megaman" },
    { src: moana, name: "Moana " },
    { src: nightcrawler, name: "NightCrawler" },
    { src: pikachu, name: "Pikachu" },
    { src: scarlet_witch, name: "Scarlet Witch" },
    { src: spiderman, name: "Spiderman" },
    { src: squirtle, name: "Squirtle" },
    { src: storm, name: "Storm" },
    { src: superman, name: "Superman " },
    { src: thor, name: "Thor " },
    { src: tiana, name: "Tiana " },
    { src: tinkerbell, name: "Tinkerbell " },
    { src: wolverine, name: "Wolverine " },
    { src: wonder_woman, name: "WonderWoman " },
    { src: yoshi, name: "Yoshi " },
  ];

  const options = avatars.map((a) => (
    <option value={a.src} key={a.name}>
      {a.name}
    </option>
  ));

  return <>{options}</>;
}

export default SelectAvatar;
