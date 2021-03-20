type Row = number[];
type Card = Row[];

const checkIsAllOnes = (row: Row) => row.every((square) => square === 1);

// https://stackoverflow.com/a/41772644
const transpose = (card: any[][]) =>
  card.reduce(
    (prev, next) => next.map((_, i) => (prev[i] || []).concat(next[i])),
    []
  );

// top left to bottom right
const getDexter = (card: Card) => {
  const dexter = [];
  for (let i = 0; i < card.length; i++) {
    dexter.push(card[i][i]);
  }
  return dexter;
};

// top right to bottom left
const getSinister = (card: Card) => {
  const sinister = [];
  for (let i = 0; i < card.length; i++) {
    sinister.push(card[i][card.length - i]);
  }
  return sinister;
};

export const checkIsGameOver = (card: Card): boolean => {
  const across = card.some((row) => checkIsAllOnes(row));
  const down = transpose(card).some((row) => checkIsAllOnes(row));
  const diagonal =
    checkIsAllOnes(getDexter(card)) || checkIsAllOnes(getSinister(card));
  return across || down || diagonal;
};
