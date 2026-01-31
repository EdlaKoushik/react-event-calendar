import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./index.css";
import "./App.css";
import eventsData from "./data/events.json";
import { loadEvents, saveEvents } from "./utils/storage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EventModal from "./components/EventModal";
import CreateEventModal from "./components/CreateEventModal";
import EventFormModal from "./components/EventFormModal";
import DayEventsModal from "./components/DayEventsModal";
import { generateCalendarDates, isOverlapping } from "./utils/calendarUtils";

const App = () => {
  // Current month state
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [showDayEvents, setShowDayEvents] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  // Selected date for popup
  const [selectedDayData, setSelectedDayData] = useState(null);

  // Today (highlight)
  const today = dayjs();

  // Calendar dates
  const calendarDates = generateCalendarDates(currentMonth);

  const handleCreateEvent = (newEvent) => {
    let conflictFound = false;

    // check conflicts against other events (exclude same id when editing)
    const otherEvents = events.filter((e) => e.id !== newEvent.id);

    const updatedOthers = otherEvents.map((event) => {
      if (event.date === newEvent.date && isOverlapping(event, newEvent)) {
        conflictFound = true;
        return { ...event, hasConflict: true };
      }
      return event;
    });

    const finalEvent = { ...newEvent, hasConflict: conflictFound };

    // replace if editing, otherwise append
    const exists = events.some((e) => e.id === newEvent.id);
    const newList = exists ? [...updatedOthers, finalEvent] : [...updatedOthers, finalEvent];

    setEvents(newList);

    if (conflictFound) {
      toast.warning("⚠ This event conflicts with another event");
    }

  setIsFormOpen(false);
  setActiveEvent(null);
  };

  // helper to check conflicts before saving
  const hasConflict = (newEvent, allEvents) => {
    return allEvents.some(
      (e) =>
        e.date === newEvent.date &&
        e.id !== newEvent.id &&
        isOverlapping(e, newEvent)
    );
  };

  // persist/load via storage utils
  useEffect(() => {
    const initial = loadEvents(eventsData);
    setEvents(initial);
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  // core CRUD handlers
  const handleSaveEvent = (event) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) {
        return prev.map((e) => (e.id === event.id ? event : e));
      }
      return [...prev, { ...event, id: Date.now() }];
    });
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // load events from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("calendarEvents");
    if (stored) setEvents(JSON.parse(stored));
    else {
      localStorage.setItem("calendarEvents", JSON.stringify(initialEvents));
      setEvents(initialEvents);
    }
  }, []);

  // sync events to localStorage
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);



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
                  onClick={() => {
                    setActiveEvent(null);
                    setSelectedDayData({ date: dayKey });
                    setIsFormOpen(true);
                  }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveEvent(event);
                          setSelectedDayData({ date: event.date });
                          setIsFormOpen(true);
                        }}
                      >
                        {event.hasConflict && <span className="warning">⚠</span>}
                        <span>{event.title}</span>
                      </div>

                    ))}

                    {/* +N MORE */}
                    {dayEvents.length > 2 && (
                      <div
                        className="more-events clickable"
                        onClick={(e) => {
                              e.stopPropagation();
                              setShowDayEvents({ date: dayKey, events: dayEvents });
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

      {showDayEvents && (
        <DayEventsModal
          data={showDayEvents}
          onClose={() => setShowDayEvents(null)}
          onSelect={(event) => {
            setShowDayEvents(null);
            setActiveEvent(event);
            setIsFormOpen(true);
            setSelectedDayData({ date: event.date });
          }}
        />
      )}

      {/* new/edit event modal */}
      {isFormOpen && (
        <EventFormModal
          isOpen={isFormOpen}
          initialData={activeEvent}
          selectedDate={selectedDayData?.date}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => {
            setIsFormOpen(false);
            setActiveEvent(null);
            setSelectedDayData(null);
          }}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />

    </div>
  );
};

export default App;
