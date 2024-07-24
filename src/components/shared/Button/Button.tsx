import MuiButton from "@mui/material/Button";

/**
 * Props for the Button component.
 */
interface ButtonProps {
  /**
   * The variant of the button.
   */
  variant?: "outlined" | "contained";
  /**
   * The color of the button.
   */
  color?: "primary";
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * The click event handler for the button.
   */
  onClick?: () => void;
  /**
   * The size of the button.
   */
  size?: "small" | "medium" | "large";
  /**
   * The content of the button.
   */
  children: React.ReactNode;
  /**
   * Whether the button should take up the full width.
   */
  fullWidth?: boolean;
  /**
   * visibile or invisible
   */
  className?: string;

  /**
   * The type of the button.
   */
  type?: "button" | "submit" | "reset";
}

/**
 * A customizable button component.
 *
 * @param props - The props for the Button component.
 * @returns The rendered Button component.
 */
const Button = ({
  variant = "contained",
  color = "primary",
  disabled = false,
  onClick,
  size = "large",
  children,
  fullWidth = false,
  className,
  type = "button",
}: ButtonProps) => {
  return (
    <MuiButton
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
      className={className}
      type={type}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
