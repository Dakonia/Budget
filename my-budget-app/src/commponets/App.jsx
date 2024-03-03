// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryList from './CategoryList';
import MainPage from './MainPage';
import CategoryExpenses from './CategoryExpenses';
import RegistrationPage from './RegistrationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/:categoryId" element={<CategoryExpenses />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
