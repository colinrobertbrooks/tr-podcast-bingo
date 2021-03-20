import { useState } from "react";
import styled from "styled-components";
import { boardData } from "../data";
import { colors } from "../styles";
import { Board, Row, Square } from "./styled";

const initialBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const decodePosition = (position: string) => {
  const [row, square] = position.split("-");
  return [Number(row), Number(square)];
};

const App = () => {
  const [board, setBoard] = useState(initialBoard);

  const getSquareIsActive = (position: string) => {
    const [row, square] = decodePosition(position);
    return board[Number(row)][Number(square)] === 1;
  };

  const handleSquareClick = (position: string) => {
    const [row, square] = decodePosition(position);
    const currentIsActive = board[row][square];
    const nextIsActive = currentIsActive === 0 ? 1 : 0;
    setBoard((currentBoard) => {
      let nextBoard = [...currentBoard];
      nextBoard[row][square] = nextIsActive;
      return nextBoard;
    });
  };

  return (
    <div className="container">
      <Heading>Podcast Bingo</Heading>
      <Board>
        {boardData.map((row, rowIdx) => (
          <Row key={rowIdx}>
            {row.map((text, colIdx) => {
              const position = `${rowIdx}-${colIdx}`;

              return (
                <Square
                  key={position}
                  isActive={getSquareIsActive(position)}
                  onClick={() => handleSquareClick(position)}
                >
                  {text}
                </Square>
              );
            })}
          </Row>
        ))}
      </Board>
    </div>
  );
};

const Heading = styled.h1`
  color: ${colors.darkGray};
  margin: 1.5rem 0;
  text-align: center;
`;

export default App;
