// src/components/invoicing/InvoiceList.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Breadcrumbs,
  Link
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// Icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Mock invoice data
const mockInvoices = [
  {
    id: 'INV-20250101',
    client: 'Johnson & Partners LLP',
    clientId: 1,
    matter: 'Big Bank Collections',
    amount: 2500.00,
    dueDate: '2025-02-01',
    issueDate: '2025-01-01',
    status: 'paid',
    paymentDate: '2025-01-20'
  },
  {
    id: 'INV-20250110',
    client: 'Smith Collections Agency',
    clientId: 2,
    matter: 'Medical Debt Recovery',
    amount: 1750.50,
    dueDate: '2025-02-10',
    issueDate: '2025-01-10',
    status: 'sent',
    paymentDate: null
  },
  {
    id: 'INV-20250115',
    client: 'Adams Credit Recovery',
    clientId: 3,
    matter: 'Credit Card Default',
    amount: 3200.75,
    dueDate: '2025-02-15',
    issueDate: '2025-01-15',
    status: 'draft',
    paymentDate: null
  },
  {
    id: 'INV-20250120',
    client: 'Johnson & Partners LLP',
    clientId: 1,
    matter: 'Auto Loan Default',
    amount: 5400.25,
    dueDate: '2025-02-20',
    issueDate: '2025-01-20',
    status: 'overdue',
    paymentDate: null
  }
];

// Helper function to get status chip
const getStatusChip = (status) => {
  switch (status) {
    case 'paid':
      return (
        <Chip 
          icon={<CheckCircleIcon />} 
          label="Paid" 
          color="success" 
          size="small" 
        />
      );
    case 'sent':
      return (
        <Chip 
          icon={<SendIcon />} 
          label="Sent" 
          color="primary" 
          size="small" 
        />
      );
    case 'draft':
      return (
        <Chip 
          icon={<EditIcon />} 
          label="Draft" 
          color="default" 
          size="small" 
        />
      );
    case 'overdue':
      return (
        <Chip 
          icon={<WarningIcon />} 
          label="Overdue" 
          color="error" 
          size="small" 
        />
      );
    default:
      return (
        <Chip 
          label={status} 
          size="small" 
        />
      );
  }
};

function InvoiceList() {
  const navigate = useNavigate();
  
  // State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  // Handle row click
  const handleRowClick = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };
  
  // Handle create invoice
  const handleCreateInvoice = () => {
    navigate('/invoices/create');
  };
  
  // Handle upload invoice
  const handleUploadInvoice = () => {
    navigate('/invoices/upload');
  };
  
  // Handle menu open
  const handleMenuOpen = (event, invoice) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };
  
  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Filter invoices based on search term
  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.matter.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get paginated invoices
  const paginatedInvoices = filteredInvoices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link 
          underline="hover" 
          color="inherit" 
          component={RouterLink} 
          to="/"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Home
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <ListIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Invoices
        </Typography>
      </Breadcrumbs>
      
      {/* Header with actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Invoices</Typography>
        
        <Box>
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadInvoice}
            sx={{ mr: 1 }}
          >
            Upload
          </Button>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </Button>
        </Box>
      </Box>
      
      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search invoices by ID, client, or matter..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      
      {/* Invoice Table */}
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Matter</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((invoice) => (
                  <TableRow 
                    key={invoice.id}
                    hover
                    onClick={() => handleRowClick(invoice.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{invoice.matter}</TableCell>
                    <TableCell align="right">${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{invoice.issueDate}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      {getStatusChip(invoice.status)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small"
                        onClick={(e) => handleMenuOpen(e, invoice)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No invoices found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchTerm 
                        ? "Try adjusting your search criteria"
                        : "Create your first invoice to get started"
                      }
                    </Typography>
                    
                    {!searchTerm && (
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateInvoice}
                        sx={{ mt: 2 }}
                      >
                        Create Invoice
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredInvoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleRowClick(selectedInvoice?.id);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => {
          navigate(`/invoices/edit/${selectedInvoice?.id}`);
          handleMenuClose();
        }} disabled={selectedInvoice?.status === 'paid'}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Invoice</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Invoice</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download PDF</ListItemText>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete Invoice</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default InvoiceList;
