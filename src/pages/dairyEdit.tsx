import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/shared/Button";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DIARY_URL_PREFIX } from "../mocks/diary/handlers";
import dayjs from "dayjs";

const DairyEditPage = () => {
  const location = useLocation();

  const dairyId = location.search.split("=")[1];

  const { data } = useQuery({
    queryKey: ["dairy-detail", dairyId],
    queryFn: async () => {
      const response = await axios.get(DIARY_URL_PREFIX + `/${dairyId}`);

      return response.data.data;
    },
    enabled: dairyId !== undefined,
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(data?.diaryContent || "");
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  const today = useMemo(
    () => (data?.entryDate ? dayjs(data.entryDate.split(" ")[0]) : dayjs()),
    [data]
  );

  return (
    <form onSubmit={handleSubmit} className="mx-8 my-[60px]">
      <Typography variant="h5" textAlign="center">
        일기쓰기
      </Typography>
      <div className="my-[60px]">
        <div className="mb-3 ml-[1px]">
          <Typography variant="subtitle1" textAlign="left">
            {today.format("YYYY년 M월 D일 dddd")}
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
