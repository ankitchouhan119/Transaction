import React, { useState } from 'react';

interface GenerateReportProps {
  onGenerateReport: (startDate: string, endDate: string) => void;
}

export const GenerateReport: React.FC<GenerateReportProps> = ({ onGenerateReport }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerate = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates for the report.');
      return;
    }
    onGenerateReport(startDate, endDate);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-center my-4 space-y-2 md:space-y-0  bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <div className="flex space-x-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="end-date">End Date</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button
        onClick={handleGenerate}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Generate Report
      </button>
      
    </div>
  );
};
