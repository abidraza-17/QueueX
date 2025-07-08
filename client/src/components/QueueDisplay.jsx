// src/components/QueueDisplay.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueueDisplay = () => {
  const [queueData, setQueueData] = useState([]);

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/queue');
      setQueueData(response.data);
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  return (
    <div className='p-4 bg-white shadow-lg rounded-lg mt-4'>
      <h2 className='text-xl font-bold mb-2'>Live Queue</h2>
      {queueData.length === 0 ? (
        <p>No tokens in queue.</p>
      ) : (
        <ul>
          {queueData.map((token) => (
            <li key={token.tokenNumber} className='mb-2 p-2 border rounded'>
              <strong>Token:</strong> {token.tokenNumber} |
              <strong> Dept:</strong> {token.department} |
              <strong> Status:</strong> {token.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueueDisplay;
