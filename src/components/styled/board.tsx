import { useRef } from "react";
import styled from "styled-components";
import useSize from "@react-hook/size";
import FitText from "@kennethormandy/react-fittext";
import { colors, unstyledButtonCSS } from "../../styles";
import { TR_LOGO_SQUARE } from "../../constants";
import logoSrc from "../../images/logo.png";

/*
 *  container
 */
export const Board = styled.div`
  box-shadow: 0px 0px 12px 0px rgba(0, 25, 50, 0.12);
  max-height: 80vh;
  max-width: 80vh;
  margin: 0 auto;
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
  width: 20%;
`;

export const SquareButton = styled.button<{ isActive: boolean }>`
  ${unstyledButtonCSS}
  background: ${({ isActive }) => (isActive ? colors.darkRed : colors.white)};
  color: ${({ isActive }) => (isActive ? colors.white : colors.gray)};
  height: 100%;
  padding: 10px;
  width: 100%;

  &:hover:enabled,
  &:focus-visible {
    background: ${({ isActive }) => (isActive ? colors.red : colors.lightRed)};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

interface ISquareProps {
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export const Square: React.FC<ISquareProps> = ({
  isActive,
  isDisabled,
  onClick,
  children,
}) => {
  const borderRef = useRef(null);
  const [borderWidth] = useSize(borderRef);
  const isLogoSquare = children?.toString().includes(TR_LOGO_SQUARE);

  return (
    <SquareOuter ref={borderRef} style={{ minHeight: borderWidth }}>
      {isLogoSquare ? (
        <img src={logoSrc} alt="Logo" className="img-fluid" />
      ) : (
        <SquareButton
          type="button"
          isActive={isActive}
          disabled={isDisabled}
          onClick={onClick}
        >
          <FitText>{children}</FitText>
        </SquareButton>
      )}
    </SquareOuter>
  );
};
