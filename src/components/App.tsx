import styled from "styled-components";
import { boardData } from "../data";
import { colors } from "../styles";
import { BoardContainer, BoardRow, BoardSquare } from "./styled";

const App = () => {
  return (
    <div className="container">
      <Heading>Podcast Bingo</Heading>
      <BoardContainer>
        {boardData.map((row, rowIdx) => (
          <BoardRow key={rowIdx}>
            {row.map((text, colIdx) => {
              const position = `${rowIdx}-${colIdx}`;

              return (
                <BoardSquare
                  key={position}
                  isActive={false}
                  onClick={() => console.log(position)}
                >
                  {text}
                </BoardSquare>
              );
            })}
          </BoardRow>
        ))}
      </BoardContainer>
    </div>
  );
};

const Heading = styled.h1`
  color: ${colors.darkGray};
  margin: 1.5rem 0;
  text-align: center;
`;

export default App;
