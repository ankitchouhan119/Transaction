import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        Showing page {currentPage} of {totalPage}
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};
