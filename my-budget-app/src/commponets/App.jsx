// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryList from './CategoryList';
import MainPage from './MainPage';
import CategoryExpenses from './CategoryExpenses';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/:categoryId" element={<CategoryExpenses />} />
      </Routes>
    </Router>
  );
}

export default App;
