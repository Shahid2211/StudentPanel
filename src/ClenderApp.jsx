import React, { useState } from "react";
// index.js or main.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClenderApp.css';

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleDateClick = (date) => setSelectedDate(date);

  const addEvent = () => {
    const title = prompt("Enter event title:");
    if (title) {
      const key = format(selectedDate, "yyyy-MM-dd");
      setEvents((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), title],
      }));
    }
  };

  const deleteEvent = (key, index) => {
    const updated = [...events[key]];
    updated.splice(index, 1);
    setEvents((prev) => ({
      ...prev,
      [key]: updated,
    }));
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <button onClick={handlePrevMonth}>←</button>
      <h2 className="text-xl font-bold">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button onClick={handleNextMonth}>→</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-bold">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, "d");
        const fullKey = format(day, "yyyy-MM-dd");
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);

        days.push(
          <div
            key={day}
            className={`p-2 border h-24 overflow-auto cursor-pointer ${
              !isCurrentMonth ? "bg-gray-100 text-gray-400" : ""
            } ${isSelected ? "bg-blue-200" : ""}`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <div className="text-sm font-semibold">{formattedDate}</div>
            <ul className="text-xs mt-1">
              {(events[fullKey] || []).map((evt, idx) => (
                <li key={idx} className="truncate flex justify-between">
                  <span>{evt}</span>
                  <button
                    className="text-red-500 ml-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEvent(fullKey, idx);
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 border rounded shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {selectedDate && (
        <div className="p-4 border-t bg-gray-100 flex justify-between items-center">
          <div>
            <strong>Selected:</strong> {format(selectedDate, "PPP")}
          </div>
          <button
            onClick={addEvent}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
}
