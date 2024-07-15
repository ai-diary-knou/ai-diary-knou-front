import Typography from "../components/shared/Typography";
import Calendar from "../components/calendar/Calendar";
import DayCard from "../components/calendar/DayCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { DIARY_URL_PREFIX } from "../mocks/diary/handlers";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const { data, isLoading } = useQuery({
    queryKey: ["monthly-reports", selectedDate.format("YYYY-MM-DD")],
    queryFn: async () => {
      const response = await axios.get(DIARY_URL_PREFIX + "/monthly-reports", {
        params: {
          year: selectedDate.year(),
          month: selectedDate.month() + 1,
          date: selectedDate.date(),
        },
      });

      return response.data.data;
    },
  });

  if (isLoading || data === undefined) {
    return <></>;
  }

  const diaryReport = data?.monthlyDiaryReports?.find(
    (diaryReport: {
      diaryId: number;
      entryDate: string;
      literarySummary: string;
    }) => diaryReport.entryDate === selectedDate.format("YYYY-MM-DD")
  );

  const diaryWritedDays = data?.monthlyDiaryReports?.map(
    (diaryReport: {
      diaryId: number;
      entryDate: string;
      literarySummary: string;
    }) => dayjs(diaryReport.entryDate).date()
  );

  return (
    <div className="mx-8 py-[60px]">
      <Typography variant="h5">한달간의 기록</Typography>
      <div className="my-[60px]">
        <Calendar
          diaryWritedDays={diaryWritedDays}
          onSelectDate={setSelectedDate}
        />
      </div>
      <div>
        <DayCard diaryReport={diaryReport} />
      </div>
    </div>
  );
};

export default CalendarPage;
