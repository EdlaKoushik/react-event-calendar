# 📅 React Calendar Application

A modern, responsive calendar application built using **React** and **Day.js**, inspired by real-world calendar tools like Google Calendar.  
It supports monthly navigation, event visualization, and detailed event pop-ups with a clean UI.

---

## 🚀 Features

- 📆 **Monthly Calendar View**
  - Displays a full 6-week grid (42 days)
  - Includes previous and next month dates for continuity

- 🔄 **Month Navigation**
  - Navigate between months using previous (`←`) and next (`→`) buttons
  - Calendar updates dynamically using React state

- 🗓️ **Event Rendering**
  - Events are displayed inside date cells
  - Maximum of **2 events per cell** with a `+N more` indicator
  - Events are color-coded for better visual distinction

- 🪟 **Event Details Modal**
  - Click on a date or `+N more` to view all events for that day
  - Modal displays:
    - Event title
    - Start and end time
    - Visual color indicator (left border)
  - Clean close interaction with overlay support

- 🎨 **Visual Enhancements**
  - Current day highlighted
  - Previous/next month dates shown in a faded style
  - Hover effects for better UX

- 📱 **Responsive Design**
  - Desktop, tablet, and mobile friendly
  - Horizontal scrolling enabled on small screens to preserve monthly view
  - Responsive modal for smaller devices

---

## 🛠️ Tech Stack

- **React** (Functional Components & Hooks)
- **Day.js** – Date manipulation
- **CSS** (Custom styling, no UI libraries)
- **Vite** – Development build tool

---

## 📁 Project Structure

src/
│
├── components/
│ └── EventModal.jsx # Popup modal for event details
│
├── data/
│ └── events.json # Static event data
│
├── utils/
│ └── calendarUtils.js # Calendar date generation logic
│
├── App.jsx # Main application component
├── App.css # Application styles
├── index.css # Global styles
└── main.jsx # React entry point 

---

## 📊 Event Data Format

```json
{
  "id": 1,
  "title": "Daily Standup",
  "date": "2026-01-22",
  "startTime": "09:00",
  "endTime": "09:30",
  "color": "#2563eb"
}


---

## 📊 Event Data Format

```json
{
  "id": 1,
  "title": "Daily Standup",
  "date": "2026-01-22",
  "startTime": "09:00",
  "endTime": "09:30",
  "color": "#2563eb"
}
```

## 👤 Author

Kaushik Edla
B.Tech Computer Science (2026)
Frontend & Full-Stack Developer

