import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Dayjs } from "dayjs";

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      color="primary"
      overlap="circular"
      variant={isSelected ? "dot" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

interface CalendarProps {
  onSelectDate: (date: Dayjs) => void;
  onSelectMonth: (date: Dayjs) => void;
  diaryWritedDays: number[];
}

const Calendar = ({
  onSelectDate,
  onSelectMonth,
  diaryWritedDays,
}: CalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={(value: Dayjs) => onSelectDate(value)}
        onMonthChange={(value: Dayjs) => onSelectMonth(value)}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays: diaryWritedDays,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
