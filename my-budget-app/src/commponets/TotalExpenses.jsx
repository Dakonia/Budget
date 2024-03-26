import React, { useState, useEffect } from 'react';
import '../styles/TotalExpenses.css';

const TotalExpenses = ({ expenses }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const calculateTotalExpenses = () => {
      try {
        // Вычисляем общую сумму трат
        let total = 0;
        expenses.forEach(expense => {
          total += parseFloat(expense.amount);
        });

        // Устанавливаем общую сумму
        setTotalExpenses(total.toFixed(2));
      } catch (error) {
        console.error('Ошибка при вычислении общей суммы трат:', error);
      }
    };

    calculateTotalExpenses();
  }, [expenses]);

  return (
    <div className="total-expenses">
      <p>Общая сумма всех трат за месяц: <span className="total-amount">{totalExpenses} рублей</span></p>
    </div>
  );
};

export default TotalExpenses;
