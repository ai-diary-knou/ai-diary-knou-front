import { useQuery } from "@tanstack/react-query";
import EmotionChart from "../components/main/EmotionChart";
import KeywordList from "../components/main/Keyword";
import RecommendList from "../components/main/Recommend";
import Slider from "../components/main/Slider";
import Typography from "../components/shared/Typography";
import { DIARY_URL_PREFIX } from "../mocks/diary/handlers";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axiosInst from "../util/axiosInst";

const MainPage = () => {
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const { data, isLoading } = useQuery({
    queryKey: ["main-reports"],
    queryFn: async () => {
      const response = await axiosInst.get(DIARY_URL_PREFIX + "/main-reports");

      return response.data.data;
    },
  });

  if (isLoading || data === undefined) {
    return <></>;
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
