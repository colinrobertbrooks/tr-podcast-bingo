import styled from "styled-components";
import ReactDomConfetti from "react-dom-confetti";
import { colors } from "../../styles";

const Confetti = ({ isActive }: { isActive: boolean }) => (
  <Position>
    <ReactDomConfetti
      active={isActive}
      config={{
        angle: 180,
        elementCount: 250,
        spread: 360,
        colors: [
          colors.lightGray,
          colors.darkGray,
          colors.lightRed,
          colors.darkRed,
        ],
      }}
    />
  </Position>
);

const Position = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default Confetti;
