import { useState } from "react";
import styled from "styled-components";
import { cardData } from "../data";
import { colors } from "../styles";
import { Card, Row, Square } from "./styled";
import { checkIsGameOver } from "../utils";

const initialCard = [
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
  const [card, setCard] = useState(initialCard);
  const isGameOver = checkIsGameOver(card);

  const getSquareIsActive = (position: string): boolean => {
    const [row, square] = decodePosition(position);
    return card[Number(row)][Number(square)] === 1;
  };

  const handleSquareClick = (position: string) => {
    const [row, square] = decodePosition(position);
    const currentIsActive = card[row][square];
    const nextIsActive = currentIsActive === 0 ? 1 : 0;
    setCard((currentCard) => {
      const nextCard = currentCard.map((row) => row.slice()); // https://stackoverflow.com/a/13756775
      nextCard[row][square] = nextIsActive;
      return nextCard;
    });
  };

  return (
    <div className="container">
      <Heading>Podcast Bingo</Heading>
      <Card className="mb-3">
        {cardData.map((row, rowIdx) => (
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
      </Card>
      {isGameOver && (
        <div className="mb-4 text-center">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => setCard(initialCard)}
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
