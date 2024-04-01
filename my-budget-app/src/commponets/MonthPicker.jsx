import React, { useState } from 'react';

const MonthPicker = ({ onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleChange = () => {
    onChange(selectedYear, selectedMonth);
  };

  return (
    <div>
      <select value={selectedMonth} onChange={e => setSelectedMonth(parseInt(e.target.value))}>
        <option value={1}>Январь</option>
        <option value={2}>Февраль</option>
        <option value={3}>Март</option>
        <option value={4}>Апрель</option>
        <option value={5}>Май</option>
        <option value={6}>Июнь</option>
        <option value={7}>Июль</option>
        <option value={8}>Август</option>
        <option value={9}>Сентябрь</option>
        <option value={10}>Октябрь</option>
        <option value={11}>Ноябрь</option>
        <option value={12}>Декабрь</option>
      </select>
      <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))}>
        {Array.from({ length: 10 }, (v, i) => new Date().getFullYear() - i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <button onClick={handleChange}>Показать траты</button>
    </div>
  );
};

export default MonthPicker;
