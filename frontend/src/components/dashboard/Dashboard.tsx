import React, { useState, useEffect } from 'react';
import { TransactionList } from '../transactionList/TransactionList';
import { TransactionFilters } from '../transactionFilters/TransactionFilters';
import { CronJobControl } from '../cronJobControl/CronJobControl';
import { transactionApi } from '../../services/api';

import { Transaction, TransactionFilters as FilterType, PaginationInfo } from '../../../../backend/src/types/transaction.types';
import { CreateTransactionForm } from '../createTransactionForm/CreateTransactionForm';
import Modal from '../../modal/Modal';
import { GenerateReport } from '../generateReport/GenerateReport';

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPage: 1,
    totalItems: 0,
  });

  const [filters, setFilters] = useState<FilterType>({
    page: 1,
    limit: 10,
    sortBy: 'timestamp',
    sortOrder: 'desc',
  });

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionApi.fetchTransactions(filters);
      setTransactions(response.transactions);
      setPagination({
        currentPage: response.page,
        totalPage: response.totalPages,
        totalItems: response.total,
      });
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (startDate: string, endDate: string) => {
    try {
      await transactionApi.generateReport(startDate, endDate);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate the report.');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleTransactionUpdate = () => {
    fetchTransactions(); // Re-fetch transactions
  };

  return (

    <div className="min-h-screen  bg-gray-100 p-4">
      <div className="w-[100%] mx-auto space-y-10">
        <div className="border border-gray-300 rounded-lg bg-white shadow-md p-6">
          <h2 className="lg:text-2xl md:text-2xl text-xl font-bold text-gray-800  text-center">Transactions Dashboard</h2>
          <div className='flex justify-center items-start lg:justify-end lg:items-end mb-2 mt-2 '>
            {/* Button to open the modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create
            </button>

            {/* Modal for creating transaction */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <CreateTransactionForm onTransactionCreated={fetchTransactions} />
            </Modal>
          </div>
          {/* Generate Report  */}
          <GenerateReport onGenerateReport={handleGenerateReport} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Filters and CRON Job Control */}
            <div className="lg:col-span-3">
              <div className="">

                <TransactionFilters filters={filters} onFilterChange={handleFilterChange} />
              </div>

              <div className="mt-4">
                <CronJobControl onStatusChange={fetchTransactions} />
              </div>

            </div>

            {/* Transaction List */}

            <div className="lg:col-span-9">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="text-red-500 text-center p-4">{error}</div>
              ) : (
                <TransactionList
                  transactions={transactions}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onTransactionUpdate={handleTransactionUpdate}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
