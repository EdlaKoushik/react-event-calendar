import { useState, useEffect } from "react";

const COLORS = [
  "bg-blue-100",
  "bg-green-100",
  "bg-orange-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-yellow-100",
  "bg-cyan-100",
  "bg-indigo-100",
];

const EventFormModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  selectedDate,
}) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("bg-blue-100");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setStartTime(initialData.startTime || "");
      setEndTime(initialData.endTime || "");
      setColor(initialData.className || "bg-blue-100");
    } else {
      setTitle("");
      setStartTime("");
      setEndTime("");
      setColor("bg-blue-100");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title || !startTime || !endTime) return;

    onSave({
      id: initialData?.id,
      title,
      date: initialData?.date || selectedDate,
      startTime,
  endTime,
  className: color || initialData?.className || "bg-blue-100",
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? "Edit Event" : "Create Event"}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <input
            className="event-input"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="time-row">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <span>–</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="color-picker">
            {COLORS.map((c) => (
              <span
                key={c}
                className={`color-dot ${c} ${color === c ? "active" : ""}`}
                onClick={() => setColor(c)}
              />
            ))}
          </div>

          <button className="primary-btn" onClick={handleSubmit}>
            Save
          </button>
          {initialData && (
            <button
              className="delete-btn"
              onClick={() => {
                onSave({ id: initialData.id, delete: true });
                onClose();
              }}
            >
              Delete Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
