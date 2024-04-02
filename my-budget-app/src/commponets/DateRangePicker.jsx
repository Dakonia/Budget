// DateRangePicker.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DateRangePicker.css';

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSearch = () => {
    if (startDate && endDate && onDateRangeChange) {
      const correctedStart = new Date(startDate);
      const correctedEnd = new Date(endDate);
      correctedStart.setDate(correctedStart.getDate() + 1);
      correctedEnd.setDate(correctedEnd.getDate() + 1);
      onDateRangeChange(correctedStart, correctedEnd);
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div className="date-range-picker-container">
      <DatePicker
        className="date-range-picker-input"
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Начальная дата"
        dateFormat="dd.MM.yyyy"
      />
      <DatePicker
        className="date-range-picker-input"
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Конечная дата"
        dateFormat="dd.MM.yyyy"
      />
      <button className="date-range-picker-button" onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default DateRangePicker;
