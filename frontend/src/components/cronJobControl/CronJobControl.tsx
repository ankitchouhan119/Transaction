import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CronJobControlProps {
  onStatusChange: () => void;
}

export function CronJobControl({ onStatusChange }: CronJobControlProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cron/status`);
      setIsRunning(response.data.isRunning);
    } catch (error) {
      console.error('Failed to fetch CRON job status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const endpoint = isRunning ? '/api/cron/stop' : '/api/cron/start';
      await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`);
      setIsRunning(!isRunning);
      onStatusChange();
    } catch (error) {
      console.error('Failed to toggle CRON job:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="border border-gray-300 rounded-lg p-6 max-w-sm mx-auto bg-white shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Transaction Generator
      </h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <div
            className={`h-3 w-3 rounded-full ${
              isRunning ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
          <span className="text-sm text-gray-600">
            {isRunning ? 'Running' : 'Stopped'}
          </span>
        </div>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-medium text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : isRunning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? (
            <span className="animate-spin">Loading...</span>
          ) : isRunning ? (
            'Stop Generator'
          ) : (
            'Start Generator'
          )}
        </button>
      </div>
    </div>
  );
}
