// src/services/invoiceService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/invoices';

const invoiceService = {
  // Get all invoices
  getInvoices: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  },
  
  // Get invoice by ID
  getInvoiceById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching invoice ${id}:`, error);
      throw error;
    }
  },
  
  // Create invoice
  createInvoice: async (invoiceData) => {
    try {
      const response = await axios.post(API_URL, invoiceData);
      return response.data;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },
  
  // Update invoice
  updateInvoice: async (id, invoiceData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, invoiceData);
      return response.data;
    } catch (error) {
      console.error(`Error updating invoice ${id}:`, error);
      throw error;
    }
  },
  
  // Delete invoice
  deleteInvoice: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting invoice ${id}:`, error);
      throw error;
    }
  },
  
  // Send invoice
  sendInvoice: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/send`);
      return response.data;
    } catch (error) {
      console.error(`Error sending invoice ${id}:`, error);
      throw error;
    }
  }
};

export default invoiceService;
