import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/create-expense/', {
        category: category,
        amount: amount,
        description: description
      });
      console.log('Expense created successfully:', response.data);
      // Добавьте здесь логику для обновления списка трат
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Категория:</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
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
  );
}

export default ExpenseForm;
