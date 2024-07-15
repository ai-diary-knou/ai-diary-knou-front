import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일을 가져옵니다
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import Typography from "../../shared/Typography";
import { Link } from "react-router-dom";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale("ko"); // 한국어 로케일을 설정합니다

type DiaryReport = {
  diaryId: number;
  entryDate: string;
  literarySummary: string;
};

interface DayCardProps {
  diaryReport?: DiaryReport;
}

const DayCard = ({ diaryReport }: DayCardProps) => {
  if (diaryReport === undefined) {
    return <></>;
  }

  return (
    <div className="w-full p-2 bg-main_color rounded-lg">
      <Link to="/dairy/ded">
        <div className="mb-3">
          <Typography variant="subtitle1" textAlign="left" color="white">
            {dayjs(diaryReport.entryDate).format("YYYY년 M월 D일 dddd")}
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="body1" textAlign="left" color="white">
            {diaryReport.literarySummary}
          </Typography>
        </div>
      </Link>
    </div>
  );
};

export default DayCard;
