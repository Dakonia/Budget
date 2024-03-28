// CategoryList.jsx

import React, { useState, useEffect } from 'react';
import api from './Api';
import { Link } from 'react-router-dom';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';
import DeleteCategoryButton from './DeleteCategoryButton';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('expense-categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Ошибка при получении категорий:', error);
    }
  };

  const handleEditCategorySuccess = () => {
    fetchCategories(); // Обновляем список категорий после успешного редактирования
  };

  const handleDeleteCategorySuccess = () => {
    fetchCategories(); // Обновляем список категорий после успешного удаления
  };

  return (
    <div>
      <h2>Список категорий трат</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
            <EditCategoryForm category={category} onSuccess={handleEditCategorySuccess} />
            <DeleteCategoryButton categoryId={category.id} onSuccess={handleDeleteCategorySuccess} />
          </li>
        ))}
      </ul>
      <AddCategoryForm onSuccess={fetchCategories} />
    </div>
  );
}

export default CategoryList;
