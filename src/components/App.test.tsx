import { render, screen } from "@testing-library/react";
import App from "./App";
import { texts } from "../data";

const renderApp = () => render(<App />);
const getAllSquares = () => screen.queryAllByTestId(/square/);

describe("layout", () => {
  test("renders heading", () => {
    renderApp();
    expect(screen.getByText("Podcast Bingo")).toBeInTheDocument();
  });

  test("renders 25 squares", () => {
    renderApp();
    expect(getAllSquares()).toHaveLength(25);
  });

  test("renders 1 free space square in the middle of the card", () => {
    renderApp();
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
    renderApp();
    const optionSquares = getAllSquares();
    const optionButtonStyles = optionSquares
      .map((el) => {
        const button = Array.from(el.children).find(
          (child) => child.tagName === "BUTTON"
        );
        if (button) {
          return window.getComputedStyle(button);
        }
        return null;
      })
      .filter((el) => el);
    const optionTexts = optionSquares
      .map((el) => el.textContent)
      .filter((textContent) => textContent);
    // unselected
    expect(
      optionButtonStyles.every((styles) => {
        const { background, color } = styles!;
        return (
          //  white and gray
          background === "rgb(255, 255, 255)" && color === "rgb(80, 80, 80)"
        );
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
