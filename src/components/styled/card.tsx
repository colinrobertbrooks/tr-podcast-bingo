import { useRef } from "react";
import styled from "styled-components";
import useSize from "@react-hook/size";
import FitText from "@kennethormandy/react-fittext";
import { colors, unstyledButtonCSS } from "../../styles";
import { FREE_SPACE } from "../../constants";
import logoSrc from "../../images/logo.png";
import Confetti from "./Confetti";

/*
 *  card
 */
export const Card = styled.div`
  box-shadow: 0px 0px 12px 0px rgba(0, 25, 50, 0.12);
  margin: 0 auto;
  max-height: 80vh;
  max-width: 80vh;
`;

/*
 *  row
 */
export const Row = styled.div`
  align-items: stretch;
  display: flex;
  width: 100%;
`;

/*
 *  square
 */
export const SquareOuter = styled.div`
  margin-top: 1px;
  margin-right: 1px;
  outline: 1px solid ${colors.lightGray};
  position: relative;
  width: 20%;
`;

export const SquareButton = styled.button<{ isSelected: boolean }>`
  ${unstyledButtonCSS}
  background: ${({ isSelected }) =>
    isSelected ? colors.darkRed : colors.white};
  color: ${({ isSelected }) => (isSelected ? colors.white : colors.gray)};
  height: 100%;
  padding: 10px;
  width: 100%;

  &:hover:enabled,
  &:focus-visible {
    background: ${({ isSelected }) =>
      isSelected ? colors.red : colors.lightRed};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

interface ISquareProps {
  isGameOver: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const Square: React.FC<ISquareProps> = ({
  isGameOver,
  isSelected,
  onClick,
  children,
  ...restProps
}) => {
  const outerRef = useRef(null);
  const [outerWidth] = useSize(outerRef);
  const isFreeSpace = children?.toString() === FREE_SPACE;

  return (
    <SquareOuter
      ref={outerRef}
      style={{ minHeight: outerWidth }}
      {...restProps}
    >
      {isFreeSpace ? (
        <>
          <Confetti isActive={isGameOver} />
          <img src={logoSrc} alt="Free space" className="img-fluid" />
        </>
      ) : (
        <SquareButton
          type="button"
          disabled={isGameOver}
          isSelected={isSelected}
          onClick={onClick}
        >
          <FitText>{children}</FitText>
        </SquareButton>
      )}
    </SquareOuter>
  );
};
