import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectFilteredUsers } from './usersSlice';

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectFilteredUsers);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p className="text-center mt-10 text-blue-600">Loading users...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {users.map((user) => (
        <div key={user.id} className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-blue-500">{user.company.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
