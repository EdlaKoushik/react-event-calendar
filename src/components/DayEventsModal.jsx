import dayjs from "dayjs";

const DayEventsModal = ({ data, onClose, onSelect }) => {
  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{dayjs(data.date).format("DD MMMM YYYY")}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {data.events.map((event) => (
            <div
              key={event.id}
              className={`modal-event ${event.className} ${
                event.hasConflict ? "conflict" : ""
              }`}
              onClick={() => onSelect(event)}
            >
              <div className="modal-event-title">
                {event.hasConflict && <span className="warning">⚠</span>}
                {event.title}
              </div>
              <div className="modal-event-time">
                {event.startTime} – {event.endTime}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayEventsModal;
