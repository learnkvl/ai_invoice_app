// src/components/dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';

// Mock data for demonstration
const mockInvoices = [
  { 
    id: 1001, 
    invoiceNumber: 'INV-20250101', 
    client: 'Johnson & Partners LLP', 
    matter: 'Big Bank Inc. Collections', 
    date: '2025-01-01', 
    dueDate: '2025-01-31', 
    amount: 2500.00, 
    status: 'paid', 
    paymentDate: '2025-01-20' 
  },
  { 
    id: 1002, 
    invoiceNumber: 'INV-20250115', 
    client: 'Smith Collections Agency', 
    matter: 'Medical Center Corp. Recovery', 
    date: '2025-01-15', 
    dueDate: '2025-02-14', 
    amount: 1750.50, 
    status: 'sent' 
  },
  { 
    id: 1003, 
    invoiceNumber: 'INV-20250120', 
    client: 'Adams Credit Recovery', 
    matter: 'Multiple Accounts Package', 
    date: '2025-01-20', 
    dueDate: '2025-02-19', 
    amount: 3250.25, 
    status: 'draft' 
  },
  { 
    id: 1004, 
    invoiceNumber: 'INV-20250105', 
    client: 'Johnson & Partners LLP', 
    matter: 'Utility Co. Default Accounts', 
    date: '2025-01-05', 
    dueDate: '2025-02-04', 
    amount: 1200.00, 
    status: 'overdue' 
  }
];

// Helper function to get status configuration
const getStatusConfig = (status) => {
  switch (status) {
    case 'draft':
      return { 
        color: 'default', 
        label: 'Draft', 
        icon: <EditIcon fontSize="small" /> 
      };
    case 'sent':
      return { 
        color: 'primary', 
        label: 'Sent', 
        icon: <SendIcon fontSize="small" /> 
      };
    case 'overdue':
      return { 
        color: 'error', 
        label: 'Overdue', 
        icon: <WarningIcon fontSize="small" /> 
      };
    case 'paid':
      return { 
        color: 'success', 
        label: 'Paid', 
        icon: <CheckCircleIcon fontSize="small" /> 
      };
    default:
      return { 
        color: 'default', 
        label: status
      };
  }
};

// Styled component for stats cards
const StatsCard = styled(Card)(({ theme, colortype }) => ({
  borderTop: `4px solid ${
    colortype === 'primary' ? theme.palette.primary.main :
    colortype === 'success' ? theme.palette.success.main :
    colortype === 'warning' ? theme.palette.warning.main :
    colortype === 'error' ? theme.palette.error.main :
    theme.palette.divider
  }`,
  height: '100%',
}));

function Dashboard() {
  const navigate = useNavigate();

  // Calculate summary statistics
  const totalPaid = mockInvoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
    
  const totalOutstanding = mockInvoices
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);
    
  const totalOverdue = mockInvoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);
    
  const totalDraft = mockInvoices
    .filter(inv => inv.status === 'draft')
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Handle create invoice button click
  const handleCreateInvoice = () => {
    navigate('/invoices/create');
  };

  // Handle view invoice
  const handleViewInvoice = (id) => {
    navigate(`/invoices/${id}`);
  };

  return (
    <Box>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateInvoice}
        >
          Create Invoice
        </Button>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard colortype="success">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                  <AttachMoneyIcon />
                </Avatar>
                <Typography variant="h6">Paid</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                ${totalPaid.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {mockInvoices.filter(inv => inv.status === 'paid').length} invoices
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard colortype="primary">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                  <HourglassEmptyIcon />
                </Avatar>
                <Typography variant="h6">Outstanding</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                ${totalOutstanding.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {mockInvoices.filter(inv => inv.status === 'sent').length} invoices
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard colortype="error">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'error.light', mr: 2 }}>
                  <WarningIcon />
                </Avatar>
                <Typography variant="h6">Overdue</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                ${totalOverdue.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {mockInvoices.filter(inv => inv.status === 'overdue').length} invoices
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard colortype="warning">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.light', mr: 2 }}>
                  <EditIcon />
                </Avatar>
                <Typography variant="h6">Drafts</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                ${totalDraft.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {mockInvoices.filter(inv => inv.status === 'draft').length} invoices
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>
      
      {/* Recent Invoices */}
      <Paper variant="outlined" sx={{ mb: 3 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Recent Invoices</Typography>
          <Button 
            variant="text" 
            size="small" 
            onClick={() => navigate('/invoices')}
          >
            View All
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockInvoices.map((invoice) => {
                const { color, label, icon } = getStatusConfig(invoice.status);
                
                return (
                  <TableRow 
                    key={invoice.id}
                    hover
                    onClick={() => handleViewInvoice(invoice.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Chip 
                        size="small"
                        label={label}
                        color={color}
                        icon={icon}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default Dashboard;
