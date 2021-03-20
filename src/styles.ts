import { css } from "styled-components";

/*
 *  colors
 */
export const colors = {
  white: "#fff",
  lightGray: "#e9e9e9",
  gray: "#505050",
  darkGray: "#373737",
  lightRed: "#fce7e6",
  red: "#e53f33",
  darkRed: "#da291c",
};

/*
 *  mixins
 */
export const unstyledButtonCSS = css`
  background-color: inherit;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-weight: inherit;
  padding: 0;
`;
