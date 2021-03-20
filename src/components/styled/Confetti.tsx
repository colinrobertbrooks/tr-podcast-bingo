import styled from "styled-components";
import ReactDomConfetti from "react-dom-confetti";
import { colors } from "../../styles";

const Confetti = ({ active }: { active: boolean }) => (
  <Position>
    <ReactDomConfetti
      active={active}
      config={{
        angle: 180,
        elementCount: 250,
        spread: 360,
        colors: [colors.white, colors.darkRed, colors.darkGray],
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
