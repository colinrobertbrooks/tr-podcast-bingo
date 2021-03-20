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
export const BoardContainer = styled.div`
  box-shadow: 0px 0px 12px 0px rgba(0, 25, 50, 0.12);
  max-height: 80vh;
  max-width: 80vh;
  margin: 0 auto;
`;

/*
 *  row
 */
export const BoardRow = styled.div`
  align-items: stretch;
  display: flex;
  width: 100%;
`;

/*
 *  square
 */
export const BoardSquareOuter = styled.div`
  margin-top: 1px;
  margin-right: 1px;
  outline: 1px solid ${colors.lightGray};
  width: 20%;
`;

export const BoardSquareButton = styled.button<{ isActive: boolean }>`
  ${unstyledButtonCSS}
  background: ${({ isActive }) => (isActive ? colors.darkRed : colors.white)};
  color: ${({ isActive }) => (isActive ? colors.white : colors.gray)};
  height: 100%;
  padding: 10px;
  width: 100%;

  &:hover,
  &:focus {
    background: ${({ isActive }) => (isActive ? colors.red : colors.lightRed)};
  }
`;

interface IBoardSquareProps {
  isActive: boolean;
  onClick: () => void;
}

export const BoardSquare: React.FC<IBoardSquareProps> = ({
  isActive,
  onClick,
  children,
}) => {
  const borderRef = useRef(null);
  const [borderWidth] = useSize(borderRef);
  const isLogoSquare = children?.toString().includes(TR_LOGO_SQUARE);

  return (
    <BoardSquareOuter ref={borderRef} style={{ minHeight: borderWidth }}>
      {isLogoSquare ? (
        <img src={logoSrc} alt="Logo" className="img-fluid" />
      ) : (
        <BoardSquareButton isActive={isActive} onClick={onClick}>
          <FitText>{children}</FitText>
        </BoardSquareButton>
      )}
    </BoardSquareOuter>
  );
};
