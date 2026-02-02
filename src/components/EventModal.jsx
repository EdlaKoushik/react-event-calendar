import dayjs from "dayjs";

const EventModal = ({ selectedDayData, onClose }) => {
  if (!selectedDayData) return null;

  const { date, events } = selectedDayData;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Events on {dayjs(date).format("DD MMMM YYYY")}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {events.length === 0 ? (
            <div className="no-events">No events</div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={`modal-event ${
                  event.hasConflict ? "conflict" : ""
                }`}
                style={{ borderLeftColor: event.color }}
              >
                <div className="modal-event-title">
                  {event.hasConflict && (
                    <span className="warning">⚠</span>
                  )}
                  {event.title}
                </div>
                <div className="modal-event-time">
                  {event.startTime} – {event.endTime}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
