// EditExpenseForm.js

import React, { useState } from 'react';
import api from './Api';

const EditExpenseForm = ({ expense, categories }) => {
  const [newAmount, setNewAmount] = useState(expense.amount);
  const [newDescription, setNewDescription] = useState(expense.description);
  const [newCategory, setNewCategory] = useState(expense.category);
  const [error, setError] = useState(null);

  const handleEditExpense = async () => {
    try {
      const response = await api.put(`expenses/${expense.id}/update/`, {
        amount: newAmount,
        description: newDescription,
        category: newCategory,
      });
      // Обработка успешного редактирования
      console.log('Трата успешно отредактирована:', response.data);
    } catch (error) {
      console.error('Ошибка при редактировании трата:', error);
      setError(error.message);
      console.log('response')
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем сообщение об ошибке */}
      <input type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
      <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
      <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button onClick={handleEditExpense}>Сохранить</button>
    </div>
  );
};

export default EditExpenseForm;