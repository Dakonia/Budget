// AddCategoryForm.jsx

import React, { useState } from 'react';
import api from './Api';

const AddCategoryForm = ({ onSuccess }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('expense-categories/', { name });
      onSuccess(); // Вызываем колбэк для обновления списка категорий после успешного добавления
      setName(''); // Очищаем поле ввода
    } catch (error) {
      console.error('Ошибка при добавлении категории:', error);
    }
  };

  return (
    <div>
      <h2>Добавить категорию трат</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите название категории" />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
