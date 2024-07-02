import MuiTypography from "@mui/material/Typography";

/**
 * Props for the Typography component.
 */
interface TypographyProps {
  /**
   * The variant of the typography.
   */
  variant: "h4" | "subtitle1" | "body1" | "caption";
  /**
   * The color of the typography.
   */
  color?: "black" | "error";
  /**
   * The content to be displayed within the typography.
   */
  children: React.ReactNode;
}

/**
 * A custom Typography component that wraps the MuiTypography component from Material-UI.
 * @param variant - The variant of the typography.
 * @param color - The color of the typography.
 * @param children - The content to be displayed within the typography.
 * @returns The Typography component.
 */
const Typography = ({
  variant,
  color = "black",
  children,
}: TypographyProps) => {
  return (
    <MuiTypography color={color} variant={variant}>
      {children}
    </MuiTypography>
  );
};

export default Typography;
