import React from 'react';
import UsersList from './features/UsersList';
import FilterDropdown from './components/FilterDropdown';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6 text-blue-700">User Dashboard</h1>
      <FilterDropdown />
      <UsersList />
    </div>
  );
};

export default App;
