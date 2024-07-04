import Typography from "../components/shared/Typography";
import Calendar from "../components/calendar/Calendar";
import DayCard from "../components/calendar/DayCard";
import { useState } from "react";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <div className="mx-8 py-[60px]">
      <Typography variant="h5">한달간의 기록</Typography>
      <div className="my-[60px]">
        <Calendar onSelectDate={setSelectedDate} />
      </div>
      <div>
        <DayCard date={selectedDate} />
      </div>
    </div>
  );
};

export default CalendarPage;
