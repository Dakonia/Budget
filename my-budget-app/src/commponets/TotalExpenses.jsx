// TotalExpenses.jsx
import React from 'react';
import '../styles/TotalExpenses.css';

const TotalExpenses = ({ expenses }) => {
  // Функция для вычисления общей суммы трат
  const calculateTotalExpenses = () => {
    let total = 0;
    expenses.forEach(expense => {
      total += parseFloat(expense.amount);
    });
    return total.toFixed(2); // Округляем до двух знаков после запятой
  };

  return (
    <div className="total-expenses">
      <p>Общая сумма всех трат за месяц: <span className="total-amount">{calculateTotalExpenses()}</span> рублей</p>
    </div>
  );
}

export default TotalExpenses;
