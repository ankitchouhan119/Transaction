import React, { useState } from 'react';
import {transactionApi}  from '../../services/api'

interface Props {
  onTransactionCreated: () => void;
}

export const CreateTransactionForm: React.FC<Props> = ({ onTransactionCreated }) => {
  const [formData, setFormData] = useState({
    userId: '',
    amount: 0,
    description: '',
    country: '',
    tags: '',
    status: 'pending',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await transactionApi.createTransaction({
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      });
      onTransactionCreated(); // Refresh transactions on success
      setFormData({
        userId: '',
        amount: 0,
        description: '',
        country: '',
        tags: '',
        status: 'pending',
      });
    } catch (err) {
      setError('Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 m-1 rounded-lg shadow">
      <h2 className="text-lg font-bold text-gray-800">Create Transaction</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Submitting...' : 'Create Transaction'}
      </button>
    </form>
  );
};
