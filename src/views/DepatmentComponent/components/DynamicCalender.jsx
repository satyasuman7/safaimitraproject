import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../component/ThemeContext.jsx";

const DynamicCalendar = () => {
  const { darkMode } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstWeekday = firstDay.getDay(); // 0 (Sun) - 6 (Sat)
    const totalDays = lastDay.getDate();
    const today = new Date();

    const weeks = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstWeekday) {
          days.push(<td key={`empty-${j}`}></td>);
        } else if (day > totalDays) {
          days.push(<td key={`empty-${i}-${j}`}></td>);
        } else {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          days.push(
            <td
              key={day}
              className={isToday ? "bg-success text-white fw-bold" : ""}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      weeks.push(<tr key={i}>{days}</tr>);
      if (day > totalDays) break;
    }

    return weeks;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const monthYearLabel = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <NavLink className={darkMode ? 'text-white' : 'text-black'}> <FiArrowLeftCircle onClick={() => changeMonth(-1)} size={30} /> </NavLink>
        <h3>{monthYearLabel}</h3>
        <NavLink className={darkMode ? 'text-white' : 'text-black'}> <FiArrowRightCircle onClick={() => changeMonth(1)} size={30} /></NavLink>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default DynamicCalendar;