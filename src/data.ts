import { FREE_SPACE } from "./constants";
import { shuffle } from "./utils";

/*
 *  options (currently 29 for 24 squares)
 */
const texts = [
  // initial (https://www.instagram.com/p/CMm2gFEFvo_)
  `JONATHAN SAYS "EXACTLY RIGHT"`,
  `"WE'RE HIRING!"`,
  `COACHES DISCUSS THE 3 OF THEM DOING A TRIATHLON IN THE FUTURE`,
  `NATE'S FAMOUS "LONG BOMB" ATTACK IS BROUGHT UP`,
  `THE TERM "BRO SCIENCE" IS USED`,
  `KEEGAN SWENSON IS MENTIONED`,
  `THE TERM "COGNITIVE LOAD" IS USED`,
  `"NOT ALL TSS IS CREATED EQUAL"`,
  `A QUESTION ABOUT STRENGTH TRAINING IS DISCUSSED`,
  `YOU STILL DON'T UNDERSTAND SOMETHING THAT WAS THOROUGHLY EXPLAINED`,
  `JONATHAN DROPS THAT TR SPONSORS THE STAN'S PIVOT TEAM`,
  `CHAD DOES A DEEP DIVE LASTING LONGER THAN 5 MINUTES`,
  `"CONSULT YOUR DOCTOR"`,
  `COACHES DEFER TO EX PRO AMBER PIERCE'S EXPERIENCE`,
  `"I DON'T HAVE ANY DATA TO BACK THIS UP"`,
  `LEADVILLE OR CAPE EPIC ARE MENTIONED`,
  `LOCAL SPRINTER JOSE IS REFERENCED`,
  `5 STAR RATING PLZ`,
  `LANCE'S PODCAST IS ALLUDED TO`,
  `NATE'S HEIGHT IS ALLUDED TO`,
  `PETE MORRIS SOUNDS CHILL AF WHILE DISCUSSING INTENSE RACING`,
  `SPRINTING FORM IS DISCUSSED`,
  `JONATHAN'S WEAK STOMACH IS TALKED ABOUT`,
  `ANYONE'S FTP IS MENTIONED`,
  // subsequent
  `BEET JUICE IS MENTIONED`,
  `TART CHERRY JUICE IS MENTIONED`,
  `SEA LEVEL VS. ALTITUDE IS DISCUSSED`,
  `YOU CAN HEAR ALEX WILD'S KEYBOARD`,
  `"CONSTANT IMPROVEMENT"`,
];

export const getRandomOptions = () => {
  const shuffledTexts = shuffle(texts);
  let shuffledTextsIdx = 0;
  const options: string[][] = [];

  for (let rowIdx = 0; rowIdx < 5; rowIdx++) {
    const row = [];
    for (let squareIdx = 0; squareIdx < 5; squareIdx++) {
      if (rowIdx === 2 && squareIdx === 2) {
        row.push(FREE_SPACE);
      } else {
        row.push(shuffledTexts[shuffledTextsIdx]);
        shuffledTextsIdx++;
      }
    }
    options.push(row);
  }

  return options;
};

/*
 *  selections
 */
export const initialSelections = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
