import { Link, useParams } from "react-router-dom";
import Typography from "../components/shared/Typography";
import DairyItem from "../components/dairyDetail/DairyItem";
import { useQuery } from "@tanstack/react-query";
import axiosInst from "../util/axiosInst";
import dayjs from "dayjs";

const DairyDetailPage = () => {
  const { dairyId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["dairy-detail", dairyId],
    queryFn: async () => {
      const response = await axiosInst.get(`/diaries/${dairyId}`);

      return response.data.data;
    },
    enabled: dairyId !== undefined,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Typography variant="h5">로딩 중...</Typography>
      </div>
    );
  }

  const day = dayjs(data.entryDate.split(" ")[0]);

  return (
    <div className="mx-8 mt-[60px] mb-[80px]">
      <div className="flex justify-between items-end mb-[60px]">
        <Typography variant="h5" textAlign="left">
          {day.format("YYYY년")}
          <br />
          {day.format("M월 D일 dddd")}
        </Typography>
        <Link to={`/edit?dairyId=${dairyId}`}>
          <Typography variant="caption">수정</Typography>
        </Link>
      </div>
      <DairyItem title="감정상태" content={data.emotions.content} />
      <DairyItem title="자기생각" content={data.selfThoughts.content} />
      <DairyItem title="핵심가치" content={data.coreValues.content} />
      <DairyItem title="해야 할 일" content={data.recommendedActions} />
      <DairyItem title="한줄 요약" content={data.literarySummary} />
      <DairyItem title="내가 쓴 일기" content={data.diaryContent} />
    </div>
  );
};

export default DairyDetailPage;
