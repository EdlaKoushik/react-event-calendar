import { useState } from "react";
import dayjs from "dayjs";
import "./index.css";
import "./App.css";
import events from "./data/events.json";

import EventModal from "./components/EventModal";
import { generateCalendarDates, isOverlapping } from "./utils/calendarUtils";

const App = () => {
  // Current month state
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Selected date for popup
  const [selectedDayData, setSelectedDayData] = useState(null);

  // Today (highlight)
  const today = dayjs();

  // Calendar dates
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

          <h2 className="month-title">{currentMonth.format("MMMM YYYY")}</h2>

          <button
            className="nav-button"
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          >
            →
          </button>
        </div>

        {/* WEEKDAYS */}
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* CALENDAR GRID */}
        <div className="calendar-grid-container">
          <div className="calendar-grid">
            {calendarDates.map((dayObj, index) => {
              const dayKey = dayObj.date.format("YYYY-MM-DD");

              const dayEvents = events
                .filter((event) => event.date === dayKey)
                .map((event, _, allEvents) => {
                  const hasConflict = allEvents.some(
                    (other) =>
                      other.id !== event.id && isOverlapping(event, other),
                  );

                  return { ...event, hasConflict };
                });

              return (
                <div
                  key={index}
                  className={`calendar-cell ${
                    !dayObj.isCurrentMonth ? "other-month" : ""
                  }`}
                  onClick={() =>
                    setSelectedDayData({ date: dayKey, events: dayEvents })
                  }
                >
                  {/* DATE */}
                  <div
                    className={`day-number ${
                      dayObj.date.isSame(today, "day") ? "today" : ""
                    }`}
                  >
                    {dayObj.date.date()}
                  </div>

                  {/* EVENTS (max 2) */}
                  <div className="events-list">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`event-item ${event.className} ${event.hasConflict ? "conflict" : ""}`}
                      >
                        {event.hasConflict && <span className="warning">⚠</span>}
                        <span>{event.title}</span>
                      </div>

                    ))}

                    {/* +N MORE */}
                    {dayEvents.length > 2 && (
                      <div
                        className="more-events clickable"
                        onClick={() => {
                          setSelectedDayData({
                            date: dayKey,
                            events: dayEvents,
                          });
                        }}
                      >
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
