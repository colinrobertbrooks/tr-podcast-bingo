import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { texts } from "../data";

const getAllSquares = () => screen.queryAllByTestId(/square/);

const getChildButton = (el: HTMLElement) =>
  Array.from(el.children).find((child) => child.tagName === "BUTTON");

const getChildButtonStyles = (el: HTMLElement) => {
  const button = getChildButton(el);
  if (button) return window.getComputedStyle(button);
  return null;
};

const colors = {
  white: "rgb(255, 255, 255)",
  gray: "rgb(80, 80, 80)",
  darkRed: "rgb(218, 41, 28)",
};

beforeEach(() => {
  render(<App />);
});

describe("layout", () => {
  test("renders heading", () => {
    expect(screen.getByText("Podcast Bingo")).toBeInTheDocument();
  });

  test("renders 25 squares", () => {
    expect(getAllSquares()).toHaveLength(25);
  });

  test("renders 1 free space square in the middle of the card", () => {
    const freeSpaceSquares = getAllSquares()
      .map((el) => {
        if (Array.from(el.children).some((child) => child.tagName === "IMG")) {
          return el;
        }
        return null;
      })
      .filter((el) => el);
    expect(freeSpaceSquares).toHaveLength(1);
    expect(freeSpaceSquares[0]).toHaveAttribute("data-testid", "square-2-2");
    const freeSpaceImg = Array.from(freeSpaceSquares[0]!.children).find(
      (child) => child.tagName === "IMG"
    );
    expect(freeSpaceImg).toHaveAttribute("alt", "Free space");
  });

  test("renders 24 unselected option squares with unique texts", () => {
    const optionSquares = getAllSquares();
    const optionButtonStyles = optionSquares
      .map(getChildButtonStyles)
      .filter((el) => el);
    const optionTexts = optionSquares
      .map((el) => el.textContent)
      .filter((textContent) => textContent);
    // unselected
    expect(
      optionButtonStyles.every((styles) => {
        const { background, color } = styles!;
        return background === colors.white && color === colors.gray;
      })
    ).toBe(true);
    // unique texts
    expect(optionTexts.every((option) => texts.includes(option!))).toBe(true);
    expect(optionTexts.length).toBe(new Set(optionTexts).size);
    // count
    expect(optionButtonStyles).toHaveLength(24);
    expect(optionTexts).toHaveLength(24);
  });
});

describe("interactivity", () => {
  test("toggles option square selection", () => {
    const getOption = () => screen.getByTestId("square-1-1");
    const findOptionButton = () => getChildButton(getOption())!;
    const getOptionStyles = () => getChildButtonStyles(getOption())!;
    // select
    fireEvent.click(findOptionButton());
    expect(getOptionStyles().background).toBe(colors.darkRed);
    expect(getOptionStyles().color).toBe(colors.white);
    // unselected
    fireEvent.click(findOptionButton());
    expect(getOptionStyles().background).toBe(colors.white);
    expect(getOptionStyles().color).toBe(colors.gray);
  });
});

/*
 *  game over
 */
// across
// down
// diagonal
