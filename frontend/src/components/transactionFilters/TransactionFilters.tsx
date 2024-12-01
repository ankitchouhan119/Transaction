import React from 'react';
import { TransactionFilters as FilterType } from '../../../../backend/src/types/transaction.types';

interface TransactionFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: Partial<FilterType>) => void;
}

export function TransactionFilters({ filters, onFilterChange }: TransactionFiltersProps) {

  const countries = ['IND', 'US', 'UK', 'AUS', 'NZ'];


  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

      <div className="space-y-4">
        {/* User ID Filter */}
        <div className="space-y-2">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            id="userId"
            type="text"
            value={filters.userId || ''}
            onChange={(e) => onFilterChange({ userId: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Filter by user ID"
          />
        </div>

        {/* Start Date Filter */}
        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => onFilterChange({ startDate: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* End Date Filter */}
        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => onFilterChange({ endDate: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description Filter */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={filters.description || ''}
            onChange={(e) => onFilterChange({ description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search in description"
          />
        </div>

        {/* Country Filter */}
        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            value={filters.country || ''}
            onChange={(e) => onFilterChange({ country: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Filter */}
        <div className="space-y-2">
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as 'amount' | 'timestamp' })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="timestamp">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        {/* Sort Order Filter */}
        <div className="space-y-2">
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
            Sort Order
          </label>
          <select
            id="sortOrder"
            value={filters.sortOrder}
            onChange={(e) => onFilterChange({ sortOrder: e.target.value as 'asc' | 'desc' })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
}
