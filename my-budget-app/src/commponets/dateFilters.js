// dateFilters.js
export const getCurrentMonthName = (date) => {
    const currentDate = date || new Date();
    return currentDate.toLocaleString('default', { month: 'long' });
  };
  
  export const handleMonthChange = (selectedMonth, setSelectedMonth) => (e) => {
    setSelectedMonth(e.target.value);
  };
  
  export const handleYearChange = (selectedYear, setSelectedYear) => (e) => {
    setSelectedYear(e.target.value);
  };
  
  export const handleFilterByMonthYear = (selectedMonth, selectedYear, setStartDate, setEndDate, fetchExpenses) => () => {
    if (selectedMonth && selectedYear) {
      const selectedStartDate = new Date(selectedYear, selectedMonth - 1, 1);
      const selectedEndDate = new Date(selectedYear, selectedMonth, 0);
      setStartDate(selectedStartDate.toISOString().split('T')[0]);
      setEndDate(selectedEndDate.toISOString().split('T')[0]);
      fetchExpenses(selectedStartDate.toISOString().split('T')[0], selectedEndDate.toISOString().split('T')[0]);
    }
  };
  
  export const handleSearch = (setSearchClicked) => () => {
    setSearchClicked(true);
  };
  