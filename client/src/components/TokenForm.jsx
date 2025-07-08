import React, { useState } from 'react';
import axios from 'axios';

const TokenForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    symptoms: '',
  });

  const [tokenData, setTokenData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/tokens',
        formData
      ); // 👈 backend endpoint
      setTokenData(res.data);
    } catch (err) {
      console.error('Error generating token:', err);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Generate Token</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='name'
          placeholder='Patient Name'
          value={formData.name}
          onChange={handleChange}
          className='w-full border px-3 py-2 rounded'
          required
        />
        <input
          type='text'
          name='department'
          placeholder='Department (e.g. Cardiology)'
          value={formData.department}
          onChange={handleChange}
          className='w-full border px-3 py-2 rounded'
          required
        />
        <textarea
          name='symptoms'
          placeholder='Symptoms'
          value={formData.symptoms}
          onChange={handleChange}
          className='w-full border px-3 py-2 rounded'
          required
        />
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Get Token
        </button>
      </form>

      {tokenData && (
        <div className='mt-4 bg-green-100 p-4 rounded'>
          <p>✅ Token Generated!</p>
          <p>
            <strong>Token ID:</strong> {tokenData.tokenId}
          </p>
          <p>
            <strong>Department:</strong> {tokenData.department}
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenForm;
