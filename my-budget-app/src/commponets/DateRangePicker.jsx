import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/DateRangePicker.css"

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSearch = () => {
    if (startDate && endDate && onDateRangeChange) {
      // Корректируем даты, чтобы учесть выбранный диапазон
      const correctedStart = new Date(startDate);
      const correctedEnd = new Date(endDate);
      correctedStart.setDate(correctedStart.getDate() + 1); // Добавляем один день к начальной дате
      correctedEnd.setDate(correctedEnd.getDate() + 2, 2); // Добавляем один день к конечной дате
      onDateRangeChange(correctedStart, correctedEnd);

      // Очищаем поля с датами после нажатия на кнопку "Поиск"
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div className="date-range-picker">
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Начальная дата"
        dateFormat="dd.MM.yyyy"
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Конечная дата"
        dateFormat="dd.MM.yyyy"
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default DateRangePicker;
