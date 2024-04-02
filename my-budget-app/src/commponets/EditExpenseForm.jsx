import React, { useState } from 'react';
import api from './Api';

const EditExpenseForm = ({ expense, categories, onExpenseUpdated }) => {
  const [isEditing, setIsEditing] = useState(false); // Состояние для отслеживания режима редактирования
  const [newAmount, setNewAmount] = useState(expense.amount);
  const [newDescription, setNewDescription] = useState(expense.description);
  const [newCategory, setNewCategory] = useState(expense.category);
  const [error, setError] = useState(null);

  const handleEditExpense = async () => {
    try {
      const response = await api.put(`expenses/${expense.id}/update/`, {
        amount: newAmount,
        description: newDescription,
        user: expense.user,
        category: newCategory,
      });
      console.log('Трата успешно отредактирована:', response.data);
      onExpenseUpdated(); // Вызываем функцию для обновления списка расходов
      setIsEditing(false); // Закрываем форму после успешного сохранения
    } catch (error) {
      console.error('Ошибка при редактировании трата:', error);
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Закрываем форму при отмене
  };

  return (
    <div>
      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>Изменить</button>
      )}
      {isEditing && (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <button onClick={handleEditExpense}>Сохранить</button>
          <button onClick={handleCancel}>Отмена</button>
        </div>
      )}
    </div>
  );
};

export default EditExpenseForm;
