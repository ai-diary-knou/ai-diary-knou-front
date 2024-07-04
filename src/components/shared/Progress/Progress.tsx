import CircularProgress from "@mui/material/CircularProgress";

interface ProgressProps {
  size?: number;
}

const Progress = ({ size = 48 }: ProgressProps) => {
  return <CircularProgress size={size} />;
};

export default Progress;
