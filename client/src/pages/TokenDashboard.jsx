import React, { useState } from 'react';

const TokenDashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [department, setDepartment] = useState('');

  const handleAddToken = (e) => {
    e.preventDefault();
    if (!patientName || !department) return;

    const newToken = {
      id: tokens.length + 1,
      name: patientName,
      department,
    };

    setTokens([...tokens, newToken]);
    setPatientName('');
    setDepartment('');
  };

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <h1 className='text-3xl font-bold mb-6 text-center text-indigo-700'>
        QueueX Token System
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Add Token Form */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Add New Token</h2>
          <form className='space-y-4' onSubmit={handleAddToken}>
            <input
              type='text'
              placeholder='Patient Name'
              className='w-full p-2 border rounded'
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Department (e.g., General)'
              className='w-full p-2 border rounded'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <button
              type='submit'
              className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
            >
              Add Token
            </button>
          </form>
        </div>

        {/* Token List */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Today's Tokens</h2>
          <ul className='space-y-2'>
            {tokens.length === 0 ? (
              <p className='text-gray-500'>No tokens added yet.</p>
            ) : (
              tokens.map((token) => (
                <li
                  key={token.id}
                  className='p-2 border rounded flex justify-between items-center'
                >
                  <span>
                    Token #{token.id} - {token.name} ({token.department})
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokenDashboard;
