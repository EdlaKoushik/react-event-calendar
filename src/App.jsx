import { useState } from "react";
import dayjs from "dayjs";
import "./App.css";
import events from "./data/events.json";
import EventModal from "./components/EventModal";
import { generateCalendarDates, isOverlapping } from "./utils/calendarUtils";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDayData, setSelectedDayData] = useState(null);
  const today = dayjs();

  const calendarDates = generateCalendarDates(currentMonth);

  return (
    <div className="calendar-page">
      <div className="calendar-card">
        {/* HEADER */}
        <div className="calendar-header">
          <button
            className="nav-button"
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          >
            ←
          </button>

          <h2 className="month-title">
            {currentMonth.format("MMMM YYYY")}
          </h2>

          <button
            className="nav-button"
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          >
            →
          </button>
        </div>

        {/* WEEKDAYS */}
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* GRID */}
        <div className="calendar-grid-container">
          <div className="calendar-grid">
            {calendarDates.map((dayObj, idx) => {
              const dayKey = dayObj.date.format("YYYY-MM-DD");

              const dayEvents = events
                .filter((e) => e.date === dayKey)
                .map((event, _, all) => ({
                  ...event,
                  hasConflict: all.some(
                    (o) => o.id !== event.id && isOverlapping(event, o)
                  ),
                }));

              return (
                <div
                  key={idx}
                  className={`calendar-cell ${
                    !dayObj.isCurrentMonth ? "other-month" : ""
                  }`}
                  onClick={() =>
                    setSelectedDayData({ date: dayKey, events: dayEvents })
                  }
                >
                  <div
                    className={`day-number ${
                      dayObj.date.isSame(today, "day") ? "today" : ""
                    }`}
                  >
                    {dayObj.date.date()}
                  </div>

                  <div className="events-list">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`event-item ${event.className} ${
                          event.hasConflict ? "conflict" : ""
                        }`}
                      >
                        {event.hasConflict && (
                          <span className="warning">⚠</span>
                        )}
                        {event.title}
                      </div>
                    ))}

                    {dayEvents.length > 2 && (
                      <div className="more-events">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <EventModal
        selectedDayData={selectedDayData}
        onClose={() => setSelectedDayData(null)}
      />
    </div>
  );
};

export default App;
