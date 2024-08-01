import { useQuery } from "@tanstack/react-query";
import EmotionChart from "../components/main/EmotionChart";
import KeywordList from "../components/main/Keyword";
import RecommendList from "../components/main/Recommend";
import Slider from "../components/main/Slider";
import Typography from "../components/shared/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axiosInst from "../util/axiosInst";
import Button from "../components/shared/Button";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const { data, isLoading } = useQuery({
    queryKey: ["main-reports"],
    queryFn: async () => {
      const response = await axiosInst.get("/diaries/main-reports");

      return response.data.data;
    },
  });

  const navigate = useNavigate();

  if (isLoading || data === undefined) {
    return <></>;
  }

  if (data.recentLiterarySummaries.length === 0) {
    return (
      <div className="px-8 py-[60px]">
        <Typography variant="h5">
          {nickname}님의
          <br />
          일기를 요약해드려요.
        </Typography>
        <div className="my-[60px] flex flex-col gap-2">
          <Typography variant="body1" textAlign="center">
            작성된 일기가 없어요.
          </Typography>
          <Typography variant="body1" textAlign="center">
            일기를 작성해주시면 {nickname}님의 일상을
          </Typography>
          <Typography variant="body1" textAlign="center">
            요약해드려요.
          </Typography>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => navigate("/edit")}>일기 작성하러 가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-[60px]">
      <Typography variant="h5">
        {nickname}님의
        <br />
        일기를 요약해드려요.
      </Typography>
      <div className="my-[60px]">
        <Slider items={data.recentLiterarySummaries} />
      </div>
      <div>
        <div className="mb-3">
          <Typography variant="subtitle1" textAlign="left">
            감정 그래프
          </Typography>
        </div>
        <div className="bg-white px-4 pt-4 rounded-lg shadow-sm mb-[60px]">
          <EmotionChart emotionData={data.recentAverageEmotionScales} />
        </div>
      </div>
      <div className="mb-[60px]">
        <div className="mb-3">
          <Typography variant="subtitle1" textAlign="left">
            나는...
          </Typography>
        </div>
        <KeywordList keywordList={data.recentRepetitiveKeywords} />
      </div>
      <div className="pb-[60px]">
        <div className="mb-3">
          <Typography variant="subtitle1" textAlign="left">
            추천 목록
          </Typography>
        </div>
        <RecommendList recommendList={data.recentRecommendedActions} />
      </div>
    </div>
  );
};

export default MainPage;
