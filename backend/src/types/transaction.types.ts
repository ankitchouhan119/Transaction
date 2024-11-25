export interface Transaction {
    transactionId: string;
    userId: string;
    amount: number;
    description: string;
    timestamp: string;
    country: string;
    tags: string[];
    status: 'pending' | 'completed' | 'failed';
}

export interface TransactionFilters {
    userId? : string;
    startDate? : string;
    endDate? : string;
    description? : string;
    tags? : string[];
    country? : string;
    page: number;
    limit: number;
    sortBy: 'amount' | 'timestamp';
    sortOrder: 'asc' | 'desc';
}

export interface TransactionQueryParams {
    userId?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    tags?: string[];
    country?: string;
    page: number;
    limit: number;
    sortBy: 'amount' | 'timestamp';
    sortOrder: 'asc' | 'desc';
  }

  export interface PaginationInfo {
    currentPage: number;
    totalPage: number;
    totalItems: number;
  }

  export type ITransaction = Transaction;