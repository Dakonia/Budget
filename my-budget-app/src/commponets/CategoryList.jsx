// CategoryList.jsx
import React, { useState, useEffect } from 'react';
import api from './Api';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('expense-categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Ошибка при получении категорий:', error));
  }, []);

  return (
    <div>
      <h2>Список категорий трат</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;