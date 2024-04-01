// DeleteExpenseButton.js

import React, { useState } from 'react';
import api from './Api';

const DeleteExpenseButton = ({ expenseId }) => {
  const [error, setError] = useState(null);

  const handleDeleteExpense = async () => {
    try {
      const response = await api.delete(`expenses/${expenseId}/delete/`);
      // Обработка успешного удаления
      console.log('Трата успешно удалена:', response.data);
    } catch (error) {
      console.error('Ошибка при удалении трата:', error);
      setError(error.message); // Устанавливаем сообщение об ошибке
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем сообщение об ошибке */}
      <button onClick={handleDeleteExpense}>Удалить</button>
    </div>
  );
};

export default DeleteExpenseButton;