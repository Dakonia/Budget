// MonthPicker.jsx
import React from 'react';

const MonthPicker = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const handleMonthSelect = (e) => {
    const selectedMonth = parseInt(e.target.value);
    if (onMonthChange) {
      onMonthChange(selectedMonth);
    }
  };

  return (
    <div className="month-picker">
      <select value={selectedMonth} onChange={handleMonthSelect}>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>{month}</option>
        ))}
      </select>
      <select value={selectedYear} onChange={(e) => onYearChange(parseInt(e.target.value))}>
        {years.map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default MonthPicker;
