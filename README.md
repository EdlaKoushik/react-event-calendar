Calendar UI - React
A sleek, interactive calendar application built with React and Day.js that displays events with conflict detection and a responsive modal view.

✨ Features
📅 Calendar Functionality
Month Navigation: Easily navigate between months using intuitive arrow buttons

Responsive Grid: 7-day week view with adaptive cell sizing

Date Highlighting: Today's date is clearly highlighted with special styling

Multi-month Display: Shows days from previous/next months with visual distinction

🎯 Event Management
Event Visualization: Color-coded events displayed within calendar cells

Conflict Detection: Automatically detects overlapping events and shows warning indicators

Event Limiting: Shows up to 2 events per day with "+N more" link for additional events

Detailed Modal: Click any day to view all events in a detailed modal with times

🎨 UI/UX
Modern Design: Clean, card-based interface with subtle shadows and animations

Interactive Elements: Hover effects, smooth transitions, and visual feedback

Mobile Responsive: Fully responsive design that works on all screen sizes

Accessible: Keyboard navigation and clear visual hierarchy

🚀 Getting Started
Prerequisites
Node.js (v14 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/yourusername/calendar-ui-react.git
cd calendar-ui-react
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
Open in browser
Navigate to http://localhost:5173 (or the port shown in your terminal)

📁 Project Structure
text
calendar-ui-react/
├── src/
│   ├── components/
│   │   └── EventModal.jsx     # Modal component for event details
│   ├── data/
│   │   └── events.json        # Sample event data
│   ├── utils/
│   │   └── calendarUtils.js   # Calendar generation and conflict detection
│   ├── App.css               # Main styles
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── public/
├── package.json
├── vite.config.js
└── README.md
🛠️ Technologies Used
React - UI library

Day.js - Lightweight date manipulation

Vite - Build tool and development server

CSS3 - Modern styling with Flexbox and Grid

🔧 Key Components
App.jsx
The main component that manages:

Current month state

Calendar date generation

Event filtering and conflict detection

Modal state management

EventModal.jsx
Modal component that displays:

All events for a selected day

Event times and colors

Conflict warnings

calendarUtils.js
Utility functions:

generateCalendarDates() - Creates 42-day calendar grid

isOverlapping() - Detects event time conflicts

📝 Adding Events
Events are stored in src/data/events.json. Add new events with this format:

json
{
  "id": 7,
  "title": "Team Meeting",
  "date": "2026-01-15",
  "startTime": "14:00",
  "endTime": "15:00",
  "color": "#3b82f6",
  "className": "bg-blue-100"
}
Event Properties
id: Unique identifier (number)

title: Event name (string)

date: Date in YYYY-MM-DD format

startTime/endTime: Time in HH:MM format (24-hour)

color: Border color for modal display

className: CSS class for event color styling

🎨 Styling
The application uses a custom CSS architecture with:

CSS Grid for calendar layout

Flexbox for component alignment

CSS Custom Properties for consistent theming

Media Queries for responsive design

Color Classes
bg-blue-100: Blue events

bg-green-100: Green events

bg-orange-100: Orange events

bg-purple-100: Purple events

📱 Responsive Design
The calendar adapts to different screen sizes:

Desktop: Full calendar grid with spacious cells

Tablet: Adjusted padding and font sizes

Mobile: Horizontal scrolling for calendar grid, optimized modal

🚀 Available Scripts
npm run dev - Start development server

npm run build - Build for production

npm run preview - Preview production build

npm run lint - Run ESLint

🧪 Future Enhancements
Potential features to add:

Add/Edit/Delete events functionality

Drag and drop event rescheduling

Recurring events support

Calendar view switching (Week, Day, Agenda)

Integration with external calendars

Event search and filtering

User authentication

Data persistence (localStorage or backend)

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add some AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Day.js for lightweight date manipulation

Vite for fast development experience

Inspired by modern calendar applications like Google Calendar

📞 Support
For support, please open an issue in the GitHub repository or contact the maintainers.

Note: This is a frontend-only application. Events are stored in a local JSON file and will reset on page refresh. Consider adding a backend or localStorage for persistent data in production use.

Made with ❤️ using React