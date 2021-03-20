const checkIsAllOnes = (row: number[]) => row.every((square) => square === 1);

// https://stackoverflow.com/a/41772644
const transpose = (matrix: any[][]) =>
  matrix.reduce(
    (prev, next) => next.map((_, i) => (prev[i] || []).concat(next[i])),
    []
  );

export const checkIsGameOver = (board: number[][]): boolean => {
  const across = board.some((row) => checkIsAllOnes(row));
  const down = transpose(board).some((row) => checkIsAllOnes(row));
  // TODO: generate
  const dexter = [
    board[0][0],
    board[1][1],
    board[2][2],
    board[3][3],
    board[4][4],
  ];
  // TODO: generate
  const sinister = [
    board[0][4],
    board[1][3],
    board[2][2],
    board[3][1],
    board[4][0],
  ];
  const diagonal = checkIsAllOnes(dexter) || checkIsAllOnes(sinister);
  return across || down || diagonal;
};
