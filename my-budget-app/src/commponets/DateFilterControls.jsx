import React from 'react';
import { getCurrentMonthName } from './dateFilters'; // добавлен импорт

const DateFilterControls = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  setStartDate,
  setEndDate,
  fetchExpenses,
  handleMonthChange,
  handleYearChange,
  handleFilterByMonthYear,
}) => {
  return (
    <div>
      <select value={selectedMonth} onChange={(e) => handleMonthChange(e, setSelectedMonth)}>
        <option value="">Select Month</option>
        {Array.from({ length: 12 }, (_, index) => index + 1).map(month => (
          <option key={month} value={month}>{getCurrentMonthName(new Date(selectedYear, month - 1))}</option>
        ))}
      </select>
      <select value={selectedYear} onChange={(e) => handleYearChange(e, setSelectedYear)}>
        <option value="">Select Year</option>
        {Array.from({ length: new Date().getFullYear() - 2023 }, (_, index) => 2024 + index).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <button onClick={() => handleFilterByMonthYear(selectedMonth, selectedYear, setStartDate, setEndDate, fetchExpenses)}>Filter</button>
    </div>
  );
}

export default DateFilterControls;
