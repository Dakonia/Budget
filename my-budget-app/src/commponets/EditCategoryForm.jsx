// EditCategoryForm.jsx

import React, { useState } from 'react';
import api from './Api';

const EditCategoryForm = ({ category, onSuccess }) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`expense-categories/${category.id}/`, { name });
      onSuccess(); // Вызываем колбэк для обновления списка категорий после успешного редактирования
    } catch (error) {
      console.error('Ошибка при редактировании категории:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Сохранить</button>
    </form>
  );
}

export default EditCategoryForm;
