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

  test("renders 24 option squares with unique texts", () => {
    renderApp();
    const optionSquares = getAllSquares()
      .map((el) => el.textContent)
      .filter((textContent) => textContent);
    expect(optionSquares).toHaveLength(24);
    expect(optionSquares.every((option) => texts.includes(option!))).toBe(true);
    expect(optionSquares.length).toBe(new Set(optionSquares).size);
  });
});
