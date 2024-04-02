// EditCategoryForm.jsx

import React, { useState } from 'react';
import api from './Api';
import '../styles/EditCategoryForm.css'; // Импорт CSS стилей

const EditCategoryForm = ({ category, onSuccess }) => {
  const [name, setName] = useState(category.name);
  const [isEditing, setIsEditing] = useState(false); // Состояние для определения, редактируется ли категория в данный момент

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`expense-categories/${category.id}/`, { name });
      onSuccess(); // Вызываем колбэк для обновления списка категорий после успешного редактирования
      setIsEditing(false); // После сохранения изменений прекращаем редактирование
    } catch (error) {
      console.error('Ошибка при редактировании категории:', error);
    }
  };

  return (
    <div className="edit-category-form">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit">Сохранить</button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>Изменить</button>
      )}
    </div>
  );
}

export default EditCategoryForm;
