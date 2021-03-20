import { useState } from "react";
import styled from "styled-components";
import { initialOptions, initialSelections } from "../data";
import { colors } from "../styles";
import { Card, Row, Square } from "./styled";
import { encodePosition, decodePosition, checkIsGameOver } from "../utils";

const App = () => {
  /*
   *  card
   */
  const [options] = useState<string[][]>(initialOptions); // NOTE: could randomize
  const [selections, setSelections] = useState<number[][]>(initialSelections);

  /*
   *  squares
   */
  const getSquareIsSelected = (position: string): boolean => {
    const [row, square] = decodePosition(position);
    return selections[Number(row)][Number(square)] === 1;
  };

  const handleSquareClick = (position: string): void => {
    const [row, square] = decodePosition(position);
    const currentIsSelected = selections[row][square];
    const nextIsSelected = currentIsSelected === 0 ? 1 : 0;
    setSelections((currentSelections) => {
      const nextSelections = currentSelections.map((row) => row.slice()); // https://stackoverflow.com/a/13756775
      nextSelections[row][square] = nextIsSelected;
      return nextSelections;
    });
  };

  /*
   *  game
   */
  const isGameOver = checkIsGameOver(selections);

  const handleReset = () => {
    setSelections(initialSelections);
  };

  return (
    <div className="container">
      <Heading>Podcast Bingo</Heading>
      <Card className="mb-3">
        {options.map((row, rowIdx) => (
          <Row key={rowIdx}>
            {row.map((option, squareIdx) => {
              const position = encodePosition(rowIdx, squareIdx);
              return (
                <Square
                  key={position}
                  isGameOver={isGameOver}
                  isSelected={getSquareIsSelected(position)}
                  onClick={() => handleSquareClick(position)}
                >
                  {option}
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
            onClick={handleReset}
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
  font-weight: 600;
`;

export default App;
