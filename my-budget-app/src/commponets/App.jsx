// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryList from './CategoryList';
import MainPage from './MainPage';
import ExpenseTable from './ExpenseTable';
import RegistrationPage from './RegistrationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/categories/:categoryId" element={<ExpenseTable />} />
        <Route path="/categories/:categoryId/:userId" component={ExpenseTable} />
      </Routes>
    </Router>
  );
}

export default App;