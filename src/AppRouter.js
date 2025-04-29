// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './components/dashboard/Dashboard';
import InvoiceList from './components/invoicing/InvoiceList';
import InvoiceCreation from './components/invoicing/InvoiceCreation';
import EnhancedInvoiceUpload from './components/invoicing/EnhancedInvoiceUpload';
import DocumentBrowser from './components/document/DocumentBrowser';
import DocumentUpload from './components/document/DocumentUpload';
import DocumentDetail from './components/document/DocumentDetail';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          
          {/* Invoice Routes */}
          <Route path="invoices" element={<InvoiceList />} />
          <Route path="invoices/create" element={<InvoiceCreation />} />
          <Route path="invoices/:id" element={<DocumentDetail />} />
          <Route path="invoices/edit/:id" element={<InvoiceCreation />} />
          <Route path="invoices/upload" element={<EnhancedInvoiceUpload />} />
          
          {/* Document Routes */}
          <Route path="documents" element={<DocumentBrowser />} />
          <Route path="documents/upload" element={<DocumentUpload />} />
          <Route path="documents/:id" element={<DocumentDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;