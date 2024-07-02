import { render, screen } from "@testing-library/react";
import Typography from "./Typography";

describe("TypographyProps", () => {
  it("should render the Typography component with the variant h4", () => {
    const variant = "h4";
    const text = "Hello, World!";
    render(<Typography variant={variant}>{text}</Typography>);

    const typography = screen.getByText(text);

    expect(typography.tagName).toBe("H4");
  });

  it("should render the Typography component with the variant subtitle1", () => {
    const variant = "subtitle1";
    const text = "Hello, World!";
    render(<Typography variant={variant}>{text}</Typography>);

    const typography = screen.getByText(text);

    expect(typography.tagName).toBe("H6");
  });

  it("should render the Typography component with the variant body1", () => {
    const variant = "body1";
    const text = "Hello, World!";
    render(<Typography variant={variant}>{text}</Typography>);

    const typography = screen.getByText(text);

    expect(typography.tagName).toBe("P");
  });

  it("should render the Typography component with the variant caption", () => {
    const variant = "caption";
    const text = "Hello, World!";
    render(<Typography variant={variant}>{text}</Typography>);

    const typography = screen.getByText(text);

    expect(typography.tagName).toBe("SPAN");
  });
});
