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

const clickOptionSquare = (testId: string) =>
  fireEvent.click(getChildButton(screen.getByTestId(testId))!);

beforeEach(() => {
  render(<App />);
});

describe("initial", () => {
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

  test("does not render reset button", () => {
    expect(screen.queryByText("Reset")).not.toBeInTheDocument();
  });
});

describe("interactivity", () => {
  test("toggles option square selection", () => {
    const testId = "square-1-1";
    const getOptionStyles = () =>
      getChildButtonStyles(screen.getByTestId(testId))!;
    // select
    clickOptionSquare(testId);
    expect(getOptionStyles().background).toBe(colors.darkRed);
    expect(getOptionStyles().color).toBe(colors.white);
    // unselected
    clickOptionSquare(testId);
    expect(getOptionStyles().background).toBe(colors.white);
    expect(getOptionStyles().color).toBe(colors.gray);
  });
});

describe("game over", () => {
  test("across", () => {
    clickOptionSquare("square-1-0");
    clickOptionSquare("square-1-1");
    clickOptionSquare("square-1-2");
    clickOptionSquare("square-1-3");
    clickOptionSquare("square-1-4");
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  test("down", () => {
    clickOptionSquare("square-0-3");
    clickOptionSquare("square-1-3");
    clickOptionSquare("square-2-3");
    clickOptionSquare("square-3-3");
    clickOptionSquare("square-4-3");
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  describe("diagonal", () => {
    test("dexter", () => {
      clickOptionSquare("square-0-0");
      clickOptionSquare("square-1-1");
      clickOptionSquare("square-3-3");
      clickOptionSquare("square-4-4");
      expect(screen.getByText("Reset")).toBeInTheDocument();
    });

    test("sinister", () => {
      clickOptionSquare("square-0-4");
      clickOptionSquare("square-1-3");
      clickOptionSquare("square-3-1");
      clickOptionSquare("square-4-0");
      expect(screen.getByText("Reset")).toBeInTheDocument();
    });
  });
});
