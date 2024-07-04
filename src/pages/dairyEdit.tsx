import { Typography } from "@mui/material";
import { useState } from "react";
import Button from "../components/shared/Button";

const DairyEditPage = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-8 my-[60px]">
      <Typography variant="h5" textAlign="center">
        일기쓰기
      </Typography>
      <div className="my-[60px]">
        <div className="mb-3 ml-[1px]">
          <Typography variant="subtitle1" textAlign="left">
            2024년 7월 1일 목요일
          </Typography>
        </div>
        <div className="mb-[60px]">
          <textarea
            name=""
            id=""
            value={value}
            placeholder="오늘은 어떤 일이 있었나요?"
            onChange={handleChange}
            className="w-full h-[40vh] rounded-lg resize-none p-4 shadow-sm"
          ></textarea>
        </div>
        <Button type="submit" fullWidth>
          저장
        </Button>
      </div>
    </form>
  );
};

export default DairyEditPage;
