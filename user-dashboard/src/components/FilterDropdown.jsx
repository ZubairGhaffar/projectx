import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyNames, setSelectedCompany } from '../features/usersSlice';

const FilterDropdown = () => {
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanyNames);
  const selected = useSelector((state) => state.users.selectedCompany);

  const handleChange = (e) => {
    dispatch(setSelectedCompany(e.target.value));
  };

  return (
    <div className="p-4">
      <select
        value={selected}
        onChange={handleChange}
        className="p-2 rounded border border-gray-300 shadow-sm"
      >
        {companies.map((company, i) => (
          <option key={i} value={company}>
            {company}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
