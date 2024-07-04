import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일을 가져옵니다
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import Typography from "../../shared/Typography";
import { Link } from "react-router-dom";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale("ko"); // 한국어 로케일을 설정합니다

interface DayCardProps {
  date: string;
}

const dummyData = [
  {
    date: "2024-07-01",
    summary: "오늘은 행복한 날이었어요",
  },
  {
    date: "2024-07-02",
    summary: "오늘은 힘들었어요",
  },
  {
    date: "2024-07-03",
    summary: "오늘은 행복한 날이었어요",
  },
];

const DayCard = ({ date }: DayCardProps) => {
  const data = dummyData.find((item) => item.date === date);

  if (date === "" || data === undefined) {
    return <></>;
  }

  return (
    <div className="w-full p-2 bg-main_color rounded-lg">
      <Link to="/dairy/ded">
        <div className="mb-3">
          <Typography variant="subtitle1" textAlign="left" color="white">
            {dayjs(data?.date).format("YYYY년 M월 D일 dddd")}
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="body1" textAlign="left" color="white">
            {data?.summary}
          </Typography>
        </div>
      </Link>
    </div>
  );
};

export default DayCard;
