 // TotalExpenses.jsx
import React from 'react';

const TotalExpenses = ({ expenses }) => {
  // Функция для вычисления общей суммы трат
  const calculateTotalExpenses = () => {
    let total = 0;
    expenses.forEach(expense => {
      total += parseFloat(expense.amount);
    });
    return total;
  };

  return (
    <div>
      <p>Общая сумма всех трат за месяц: {calculateTotalExpenses()} рублей</p>
    </div>
  );
}

export default TotalExpenses;
