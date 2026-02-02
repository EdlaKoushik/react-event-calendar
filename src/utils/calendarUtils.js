import dayjs from "dayjs";

export const generateCalendarDates = (currentMonth) => {
  const month = currentMonth || dayjs();
  const days = [];
  const start = month.startOf("month");
  const end = month.endOf("month");

  for (let i = start.day() - 1; i >= 0; i--) {
    days.push({ date: start.subtract(i + 1, "day"), isCurrentMonth: false });
  }

  for (let i = 0; i < end.date(); i++) {
    days.push({ date: start.add(i, "day"), isCurrentMonth: true });
  }

  while (days.length < 42) {
    days.push({
      date: days[days.length - 1].date.add(1, "day"),
      isCurrentMonth: false,
    });
  }

  return days;
};

export const isOverlapping = (a, b) => {
  const sA = dayjs(`2026-01-01 ${a.startTime}`);
  const eA = dayjs(`2026-01-01 ${a.endTime}`);
  const sB = dayjs(`2026-01-01 ${b.startTime}`);
  const eB = dayjs(`2026-01-01 ${b.endTime}`);

  return sA.isBefore(eB) && sB.isBefore(eA);
};
