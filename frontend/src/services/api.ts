import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});


export const updateTransaction = async (transactionId: string, data: Record<string, any>) => {
  try {
    // Making a PUT request to update the transaction
    const response = await axios.put(`${API_BASE_URL}/transactions/${transactionId}`, data);
    return response.data; // Return the updated transaction data
  } catch (error) {
    console.error('Failed to update transaction:', error);
    throw new Error('Failed to update transaction');
  }
};

export const transactionApi = {
  fetchTransactions: async (params = {}) => {
    try {
      const response = await api.get('/transactions', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw error;
    }
  },

  createTransaction: async (data: Record<string, any>) => {
    return await axios.post(`${API_BASE_URL}/transactions`, data);
  },

  getTransactionById: async (id: string) => {
    try {
      const response = await api.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get transaction:', error);
      throw error;
    }
  },


  generateReport: async (startDate: string, endDate: string) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/transactions/report`,
          {
            params: { startDate, endDate, format: 'csv' },
            responseType: 'blob', // Important for file downloads
          }
        );
    
        // Create a blob URL and trigger download
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'transaction-report.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Failed to generate report:', error);
        throw error;
      }
  }
};  



export default transactionApi;