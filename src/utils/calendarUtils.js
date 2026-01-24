import dayjs from "dayjs";

export const generateCalendarDates = (currentMonth) => {
  const month = currentMonth ? currentMonth : dayjs();
  const days = [];
  const startOfMonth = month.startOf("month");
  const endOfMonth = month.endOf("month");
  const startDay = startOfMonth.day(); // 0 (Sun) - 6 (Sat)

  // Days from previous month
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: startOfMonth.subtract(i + 1, "day"),
      isCurrentMonth: false,
    });
  }

  // Days of current month
  for (let i = 0; i < endOfMonth.date(); i++) {
    days.push({ date: startOfMonth.add(i, "day"), isCurrentMonth: true });
  }

  // Days from next month to fill 42 cells
  while (days.length < 42) {
    days.push({
      date: days[days.length - 1].date.add(1, "day"),
      isCurrentMonth: false,
    });
  }

  return days;
};

export const isOverlapping = (eventA, eventB) => {
  const startA = dayjs(`2026-01-01 ${eventA.startTime}`);
  const endA = dayjs(`2026-01-01 ${eventA.endTime}`);

  const startB = dayjs(`2026-01-01 ${eventB.startTime}`);
  const endB = dayjs(`2026-01-01 ${eventB.endTime}`);

  return startA.isBefore(endB) && startB.isBefore(endA);
};
