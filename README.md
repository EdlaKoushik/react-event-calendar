# 📅 React Calendar Application

A modern, responsive calendar application built using **React** and **Day.js**, inspired by real-world calendar tools like Google Calendar.  
It supports monthly navigation, event visualization inside calendar cells, and a detailed event pop-up with a clean and intuitive UI.

---

## 🚀 Features

- 📆 **Monthly Calendar View**
  - Displays a full 6-week grid (42 days)
  - Includes previous and next month dates for visual continuity

- 🔄 **Month Navigation**
  - Navigate between months using previous (`←`) and next (`→`) buttons
  - Calendar updates dynamically using React state

- 🗓️ **Event Display**
  - Events shown directly inside calendar cells
  - Maximum **2 events per day** shown in the cell
  - `+N more` indicator for additional events
  - Color-coded events for quick visual distinction

- 🪟 **Event Details Modal**
  - Click on a date or `+N more` to view all events for that day
  - Modal displays:
    - Event title
    - Start and end time
    - Color indicator (left border)
  - Smooth open/close behavior with overlay

- 🎨 **UI & UX Enhancements**
  - Current day highlighted
  - Previous and next month dates shown in a faded style
  - Hover effects on calendar cells and events
  - Clean, minimal design

- 📱 **Responsive Design**
  - Works on desktop, tablet, and mobile devices
  - Horizontal scrolling enabled on small screens to preserve calendar layout
  - Responsive modal layout

---

## 🛠️ Tech Stack

- **React** (Functional Components & Hooks)
- **Day.js** – Date and time manipulation
- **CSS** – Custom styling (no UI libraries)
- **Vite** – Development and build tool

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


## Usage of color:
-Light background color for event titles in calendar cells
-Thick left border indicator in the event modal

## 🧠 Design Decisions

-42-cell (6-week) grid ensures a consistent calendar layout every month

-Centered modal avoids complex positioning logic

-Static JSON data keeps focus on UI, state management, and logic

-Horizontal scrolling on mobile preserves the full calendar view

## ▶️ Running the Project Locally
-npm install
-npm run dev

## 👤 Author

-Koushik Edla
-B.Tech Computer Science (2026)
-Frontend & Full-Stack Developer