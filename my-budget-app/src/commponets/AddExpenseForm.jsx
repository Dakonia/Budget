// AddExpenseForm.jsx
import React, { useState } from 'react';
import api from './Api';
import '../styles/AddExpenseForm.css';

const AddExpenseForm = ({ categories, handleRefresh }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('create-expense/', {
        category: selectedCategory,
        amount: amount,
        description: description
      });

      console.log('Expense created successfully:', response.data);
      setSelectedCategory('');
      setAmount('');
      setDescription('');
      handleRefresh(); // Вызываем функцию обновления списка трат после успешного добавления
    } catch (error) {
      console.error('Error creating expense:', error);
      setError(error.message); // Устанавливаем сообщение об ошибке
    }
  };

  return (
    <div className="form-container">
      <h2>Добавить новую трату</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем сообщение об ошибке */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Категория:</label>
          <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Выберите категорию</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount">Сумма:</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Описание:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default AddExpenseForm;
