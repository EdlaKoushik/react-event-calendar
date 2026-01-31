import { useState, useEffect } from "react";
import dayjs from "dayjs";
import '../App.css';

const CreateEventModal = ({ initialEvent, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || "");
      setStartTime(initialEvent.startTime || "");
      setEndTime(initialEvent.endTime || "");
    }
  }, [initialEvent]);

  if (!initialEvent) return null;

  const handleSubmit = () => {
    if (!title || !startTime || !endTime) return;

    onSave({
      id: initialEvent.id || Date.now(),
      title,
      date: initialEvent.date,
      startTime,
      endTime,
      className: initialEvent.className || "bg-blue-100",
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Event</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div>
            <strong>{dayjs(date).format("DD MMM YYYY")}</strong>
          </div>

          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
