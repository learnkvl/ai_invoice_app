// src/services/documentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/documents';

const documentService = {
  // Get all documents
  getDocuments: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  },
  
  // Get document by ID
  getDocumentById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
      throw error;
    }
  },
  
  // Upload document
  uploadDocument: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },
  
  // Process document
  processDocument: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/process`);
      return response.data;
    } catch (error) {
      console.error(`Error processing document ${id}:`, error);
      throw error;
    }
  }
};

export default documentService;
