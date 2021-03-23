import { useState } from "react";
import styled from "styled-components";
import { getRandomOptions, initialSelections } from "../data";
import { colors } from "../styles";
import { Card, Row, Square } from "./styled";
import { checkIsGameOver } from "../utils";

const App = () => {
  /*
   *  card
   */
  const [options, setOptions] = useState<string[][]>(getRandomOptions);
  const [selections, setSelections] = useState<number[][]>(initialSelections);

  /*
   *  squares
   */
  const getSquareIsSelected = (rowIdx: number, squareIdx: number): boolean =>
    selections[rowIdx][squareIdx] === 1;

  const handleSquareClick = (rowIdx: number, squareIdx: number): void => {
    const currentIsSelected = selections[rowIdx][squareIdx];
    const nextIsSelected = currentIsSelected === 0 ? 1 : 0;
    setSelections((currentSelections) => {
      const nextSelections = currentSelections.map((row) => row.slice()); // https://stackoverflow.com/a/13756775
      nextSelections[rowIdx][squareIdx] = nextIsSelected;
      return nextSelections;
    });
  };

  /*
   *  game
   */
  const isGameOver = checkIsGameOver(selections);

  const handleReset = () => {
    setOptions(getRandomOptions);
    setSelections(initialSelections);
  };

  return (
    <div className="container">
      <Heading>Podcast Bingo</Heading>
      <Card className="mb-3">
        {options.map((row, rowIdx) => (
          <Row key={rowIdx}>
            {row.map((option, squareIdx) => {
              const position = `${rowIdx}-${squareIdx}`;
              return (
                <Square
                  key={position}
                  data-testid={`square-${position}`}
                  isGameOver={isGameOver}
                  isSelected={getSquareIsSelected(rowIdx, squareIdx)}
                  onClick={() => handleSquareClick(rowIdx, squareIdx)}
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
