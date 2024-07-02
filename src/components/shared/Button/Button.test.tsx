import Button from "./Button";
import userEvent, {
  PointerEventsCheckLevel,
} from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

describe("Button Component", () => {
  it("should render the Button component", () => {
    render(<Button>Test</Button>);

    const button = screen.getByRole("button");

    expect(button.textContent).toBe("Test");
    expect(button).toHaveProperty("type", "button");
    expect(button).toHaveProperty("disabled", false);
  });

  it("should render the Button component with the correct type", () => {
    render(<Button type="submit">Test</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveProperty("type", "submit");
    expect(button).toHaveProperty("disabled", false);
  });

  it("should call the onClick event handler when clicked", async () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Test</Button>);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should render the Button component as disabled", async () => {
    const onClickMock = vi.fn();

    render(
      <Button onClick={onClickMock} disabled>
        Test
      </Button>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button, {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    expect(button).toHaveProperty("disabled", true);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
