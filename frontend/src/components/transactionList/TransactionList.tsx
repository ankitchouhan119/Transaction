import React, { useState } from 'react';
import { Transaction, PaginationInfo } from '../../../../backend/src/types/transaction.types';
import { FaPen } from 'react-icons/fa';
import { updateTransaction } from '../../services/api'; 
import { Pagination } from '../pagination/Pagination';

interface TransactionListProps {
  transactions: Transaction[];
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onTransactionUpdate: () => void; // Callback to refresh transactions after update
}

export function TransactionList({ 
  transactions, 
  pagination, 
  onPageChange, 
  onTransactionUpdate 
}: TransactionListProps) {
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);
  const [editedTransaction, setEditedTransaction] = useState<Partial<Transaction>>({});

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransactionId(transaction.transactionId);
    setEditedTransaction(transaction); 
  };

  const handleInputChange = (field: keyof Transaction, value: string) => {
    setEditedTransaction((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingTransactionId) return;
    try {
      await updateTransaction(editingTransactionId, editedTransaction);
      setEditingTransactionId(null);
      setEditedTransaction({});
      onTransactionUpdate(); // Refresh the transaction list
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const handleCancel = () => {
    setEditingTransactionId(null);
    setEditedTransaction({});
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Transaction ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">User ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Country</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="py-2 text-left text-sm font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId} className="border-b">
                <td className="px-4 py-2 font-mono text-sm text-gray-800">
                  {transaction.transactionId.slice(0, 8)}...
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{transaction.userId}</td>
                <td className="px-4 py-2 text-sm text-gray-800">₹ {transaction.amount.toFixed(2)}</td>

                {/* Editable Fields */}
                <td className="px-4 py-2 text-sm text-gray-800">
                  {editingTransactionId === transaction.transactionId ? (
                    <input
                      type="text"
                      value={editedTransaction.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md"
                    />
                  ) : (
                    transaction.description
                  )}
                </td>
                
                <td className="px-4 py-2 text-sm text-gray-800">
                  {editingTransactionId === transaction.transactionId ? (
                    <input
                      type="date"
                      value={editedTransaction.timestamp?.slice(0, 10) || ''}
                      onChange={(e) => handleInputChange('timestamp', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md"
                    />
                  ) : (
                    new Date(transaction.timestamp).toLocaleDateString()
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {editingTransactionId === transaction.transactionId ? (
                    <input
                      type="text"
                      value={editedTransaction.country || ''}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md"
                    />
                  ) : (
                    transaction.country
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {editingTransactionId === transaction.transactionId ? (
                    <select
                      value={editedTransaction.status || 'pending'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  )}
                </td>

                {/* Action Buttons */}
                <td className="pr-4 py-2 text-sm text-gray-800">
                  {editingTransactionId === transaction.transactionId ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="px-2 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(transaction)}
                      className=" text-sm text-gray-300 rounded-md hover:text-gray-400"
                    >
                       <FaPen />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
