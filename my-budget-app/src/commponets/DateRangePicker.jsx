// DateRangePicker.js
import React from 'react';

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate, handleSearch }) => {
  return (
    <div>
      <label htmlFor="startDate">Start Date:</label>
      <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <label htmlFor="endDate">End Date:</label>
      <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={() => handleSearch(true)}>Search</button>
    </div>
  );
}

export default DateRangePicker;
