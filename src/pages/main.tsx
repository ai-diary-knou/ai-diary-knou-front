import EmotionChart from "../components/main/EmotionChart";
import KeywordList from "../components/main/Keyword";
import Slider from "../components/main/Slider";
import Typography from "../components/shared/Typography";

const dummyItems = [
  "좋은 꿈을 꿔서 즐거운 아침을 맞이했어요.",
  "오늘은 친구들과 함께 즐거운 시간을 보냈어요.",
  "오늘은 책을 읽으면서 즐거운 시간을 보냈어요.",
  "오늘은 새로운 친구를 사귀어서 기뻤어요.",
  "오늘은 새로운 경험을 했어요.",
  "오늘은 즐거운 일이 있어 기분이 좋았어요.",
  "오늘은 새로운 것을 배워서 기뻤어요.",
];

const Main = () => {
  return (
    <main className="px-8 text-center pt-[60px]">
      <Typography variant="h5">
        성장일기님의
        <br />
        일기를 요약해드려요.
      </Typography>
      <div className="my-[60px]">
        <Slider items={dummyItems} />
      </div>
      <div>
        <div className="mb-3">
          <Typography variant="subtitle1" textAlign="left">
            감정 그래프
          </Typography>
        </div>
        <div className="bg-white px-4 pt-4 rounded-lg shadow-sm mb-[60px]">
          <EmotionChart />
        </div>
      </div>
      <div className="mb-[60px]">
        <div className="mb-3">
          <Typography variant="subtitle1" textAlign="left">
            나는...
          </Typography>
        </div>
        <KeywordList />
      </div>
    </main>
  );
};

export default Main;
