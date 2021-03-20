import { useState } from "react";
import styled from "styled-components";
import { boardData } from "../data";
import { colors } from "../styles";
import { Board, Row, Square } from "./styled";
import { checkIsGameOver } from "../utils";

const initialBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const decodePosition = (position: string): [number, number] => {
  const [row, square] = position.split("-");
  return [Number(row), Number(square)];
};

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const isGameOver = checkIsGameOver(board);

  const getSquareIsActive = (position: string): boolean => {
    const [row, square] = decodePosition(position);
    return board[Number(row)][Number(square)] === 1;
  };

  const handleSquareClick = (position: string) => {
    const [row, square] = decodePosition(position);
    const currentIsActive = board[row][square];
    const nextIsActive = currentIsActive === 0 ? 1 : 0;
    setBoard((currentBoard) => {
      const nextBoard = currentBoard.map((row) => row.slice()); // https://stackoverflow.com/a/13756775
      nextBoard[row][square] = nextIsActive;
      return nextBoard;
    });
  };

  return (
    <div className="container">
      <Heading>Podcast Bingo</Heading>
      <Board className="mb-3">
        {boardData.map((row, rowIdx) => (
          <Row key={rowIdx}>
            {row.map((text, colIdx) => {
              const position = `${rowIdx}-${colIdx}`;
              return (
                <Square
                  key={position}
                  isActive={getSquareIsActive(position)}
                  isDisabled={isGameOver}
                  onClick={() => handleSquareClick(position)}
                >
                  {text}
                </Square>
              );
            })}
          </Row>
        ))}
      </Board>
      {isGameOver && (
        <div className="mb-4 text-center">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => setBoard(initialBoard)}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

const Heading = styled.h1.attrs({ className: "my-4 text-center" })`
  color: ${colors.darkGray};
`;

export default App;
