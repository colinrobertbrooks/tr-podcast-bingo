const checkIsAllOnes = (row: number[]) => row.every((square) => square === 1);

// https://stackoverflow.com/a/41772644
const transpose = (card: any[][]) =>
  card.reduce(
    (prev, next) => next.map((_, i) => (prev[i] || []).concat(next[i])),
    []
  );

export const checkIsGameOver = (card: number[][]): boolean => {
  const across = card.some((row) => checkIsAllOnes(row));
  const down = transpose(card).some((row) => checkIsAllOnes(row));
  // TODO: generate
  const dexter = [card[0][0], card[1][1], card[2][2], card[3][3], card[4][4]];
  // TODO: generate
  const sinister = [card[0][4], card[1][3], card[2][2], card[3][1], card[4][0]];
  const diagonal = checkIsAllOnes(dexter) || checkIsAllOnes(sinister);
  return across || down || diagonal;
};
