import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/shared/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import axiosInst from "../util/axiosInst";
import { showToast } from "../components/shared/Toast";
import Loader from "../components/diaryEdit/Loader";

const DairyEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dairyId = location.search.split("=")[1];

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const { data } = useQuery({
    queryKey: ["dairy-detail", dairyId],
    queryFn: async () => {
      const response = await axiosInst.get(`/diaries/${dairyId}`);

      return response.data.data;
    },
    enabled: dairyId !== undefined,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      setIsSaveLoading(true);

      let id = dairyId;

      if (dairyId) {
        const res = await axiosInst.put(`/diaries/${dairyId}`, {
          content: value,
        });

        id = res.data.data.diaryId;

        navigate(`/dairy/${id}`);
      } else {
        const res = await axiosInst.post("/diaries", {
          entryDate: dayjs().format("YYYY-MM-DD"),
          content: value,
        });

        id = res.data.data.diaryId;

        navigate(`/dairy/${id}`);
      }
    },
    onError: () => {
      showToast({
        message: "일기 저장에 실패했습니다.",
        type: "error",
        position: "top-center",
        autoClose: 3000,
      });
    },
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
    mutation.mutate();
  };

  const today = useMemo(
    () => (data?.entryDate ? dayjs(data.entryDate.split(" ")[0]) : dayjs()),
    [data]
  );

  if (isSaveLoading) {
    return <Loader />;
  }

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
          {dairyId ? "수정" : "저장"}
        </Button>
      </div>
    </form>
  );
};

export default DairyEditPage;
