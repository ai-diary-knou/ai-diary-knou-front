import React from "react";
import Typography from "../../shared/Typography";

interface DairyItemProps {
  title: string;
  content: React.ReactNode;
}

const DairyItem = ({ title, content }: DairyItemProps) => {
  return (
    <div className="mb-10">
      <div className="mb-2">
        <Typography variant="subtitle1" textAlign="left">
          {title}
        </Typography>
      </div>
      <div>
        <Typography variant="body1" textAlign="left">
          {content}
        </Typography>
      </div>
    </div>
  );
};

export default DairyItem;
