// DeleteCategoryButton.jsx

import React from 'react';
import api from './Api';
import '../styles/DeleteCategoryButton.css'; // Импорт CSS стилей

const DeleteCategoryButton = ({ categoryId, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`expense-categories/${categoryId}/`);
      onSuccess(); // Вызываем колбэк для обновления списка категорий после успешного удаления
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
    }
  };

  return (
    <button className="delete-category-button" onClick={handleDelete}>Удалить</button>
  );
}

export default DeleteCategoryButton;
