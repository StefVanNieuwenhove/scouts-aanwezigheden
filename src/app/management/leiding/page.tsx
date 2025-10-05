import { getUsers } from '@/data-acces/users';
import React from 'react';

const LeidingOverviewPage = async () => {
  const users = await getUsers();
  console.log(users);
  return <div>LeidingOverviewPage</div>;
};

export default LeidingOverviewPage;
