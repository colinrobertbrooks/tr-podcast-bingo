/*
 *  data
 */
// https://stackoverflow.com/a/46161940
export const shuffle = (array: any[]): any[] => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[rand]] = [shuffled[rand], shuffled[i]];
  }
  return shuffled;
};

/*
 *  game
 */
const checkIsAllOnes = (row: number[]): boolean =>
  row.every((selection) => selection === 1);

// https://stackoverflow.com/a/41772644
const transpose = (matrix: any[][]): any[][] =>
  matrix.reduce(
    (prev, next) => next.map((_, i) => (prev[i] || []).concat(next[i])),
    []
  );

// top left to bottom right
const getDexter = (selections: number[][]): number[] => {
  const dexter = [];
  for (let i = 0; i < selections.length; i++) {
    dexter.push(selections[i][i]);
  }
  return dexter;
};

// top right to bottom left
const getSinister = (selections: number[][]): number[] => {
  const sinister = [];
  for (let i = 0; i < selections.length; i++) {
    sinister.push(selections[i][selections.length - (i + 1)]);
  }
  return sinister;
};

export const checkIsGameOver = (selections: number[][]): boolean => {
  const across = selections.some((row) => checkIsAllOnes(row));
  const down = transpose(selections).some((row) => checkIsAllOnes(row));
  const diagonal =
    checkIsAllOnes(getDexter(selections)) ||
    checkIsAllOnes(getSinister(selections));
  return across || down || diagonal;
};
