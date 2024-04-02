import React, { useState } from 'react';
import api from './Api';

const DeleteExpenseButton = ({ expenseId, onExpenseDeleted }) => {
  const [error, setError] = useState(null);

  const handleDeleteExpense = async () => {
    try {
      const response = await api.delete(`expenses/${expenseId}/delete/`);
      console.log('Трата успешно удалена:', response.data);
      onExpenseDeleted(); // Вызываем функцию для обновления списка расходов
    } catch (error) {
      console.error('Ошибка при удалении трата:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleDeleteExpense}>Удалить</button>
    </div>
  );
};

export default DeleteExpenseButton;
