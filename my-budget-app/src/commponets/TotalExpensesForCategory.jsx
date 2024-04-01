import React, { useState, useEffect } from 'react';

const TotalExpensesForCategory = ({ expenses }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const calculateTotalExpenses = () => {
      let total = 0;
      expenses.forEach(expense => {
        total += parseFloat(expense.amount);
      });

      setTotalExpenses(total.toFixed(2));

    };

    calculateTotalExpenses();
  }, [expenses]);

  return (
    <div className="total-expenses">
      <p>Общая сумма всех трат по категории: <span className="total-amount">{totalExpenses} рублей</span></p>
    </div>
  );
};

export default TotalExpensesForCategory;
