// src/components/invoicing/InvoiceCreation.js
import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Divider, 
  IconButton, 
  MenuItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  InputAdornment,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  Breadcrumbs,
  Link
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays } from 'date-fns';

// Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';

// Initial empty line item
const emptyLineItem = {
  description: '',
  quantity: 1,
  rate: 0,
  amount: 0
};

// Mock clients data
const clients = [
  { id: 1, name: 'Johnson & Partners LLP', email: 'billing@johnsonpartners.com' },
  { id: 2, name: 'Smith Collections Agency', email: 'accounts@smithcollections.com' },
  { id: 3, name: 'Adams Credit Recovery', email: 'invoicing@adamsrecovery.com' },
];

function InvoiceCreation() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  // Form state
  const [client, setClient] = useState('');
  const [matter, setMatter] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-8)}`);
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(addDays(new Date(), 30));
  const [lineItems, setLineItems] = useState([{ ...emptyLineItem }]);
  const [notes, setNotes] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState(
    'Payment is due within 30 days of invoice date. Late payments subject to 1.5% monthly interest.'
  );

  // Steps for invoice creation process
  const steps = ['Client Info', 'Line Items', 'Review & Send'];

  // Calculate subtotal and total
  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const total = subtotal; // Add tax calculation if needed

  // Handle adding a line item
  const handleAddLineItem = () => {
    setLineItems([...lineItems, { ...emptyLineItem }]);
  };

  // Handle removing a line item
  const handleRemoveLineItem = (index) => {
    const newLineItems = [...lineItems];
    newLineItems.splice(index, 1);
    setLineItems(newLineItems);
  };

  // Handle line item change
  const handleLineItemChange = (index, field, value) => {
    const newLineItems = [...lineItems];
    newLineItems[index][field] = value;
    
    // Automatically calculate amount
    if (field === 'quantity' || field === 'rate') {
      newLineItems[index].amount = newLineItems[index].quantity * newLineItems[index].rate;
    }
    
    setLineItems(newLineItems);
  };

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle save invoice
  const handleSaveInvoice = () => {
    // In a real app, this would save to backend
    console.log('Saving invoice:', {
      client,
      matter,
      invoiceNumber,
      invoiceDate,
      dueDate,
      lineItems,
      subtotal,
      total,
      notes,
      termsAndConditions
    });
    
    navigate('/invoices');
  };

  // Handle send invoice
  const handleSendInvoice = () => {
    // In a real app, this would send to client
    console.log('Sending invoice:', {
      client,
      matter,
      invoiceNumber,
      invoiceDate,
      dueDate,
      lineItems,
      subtotal,
      total,
      notes,
      termsAndConditions
    });
    
    navigate('/invoices');
  };

  // Render different step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Client Information" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          select
                          fullWidth
                          label="Client"
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
                          required
                        >
                          {clients.map((c) => (
                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Matter"
                          value={matter}
                          onChange={(e) => setMatter(e.target.value)}
                          required
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Invoice Details" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Invoice Number"
                          value={invoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Invoice Date"
                            value={invoiceDate}
                            onChange={(newValue) => setInvoiceDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Due Date"
                            value={dueDate}
                            onChange={(newValue) => setDueDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Line Items</Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddLineItem}
                  variant="contained"
                  size="small"
                >
                  Add Item
                </Button>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Rate ($)</TableCell>
                      <TableCell align="right">Amount ($)</TableCell>
                      <TableCell width="50px"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lineItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            fullWidth
                            variant="standard"
                            value={item.description}
                            onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                            placeholder="Enter item description"
                            required
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            variant="standard"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleLineItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                            inputProps={{ min: 0, step: 0.01, style: { textAlign: 'right' } }}
                            sx={{ width: 70 }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            variant="standard"
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleLineItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                            inputProps={{ min: 0, step: 0.01, style: { textAlign: 'right' } }}
                            sx={{ width: 80 }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          ${(item.quantity * item.rate).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveLineItem(index)}
                            disabled={lineItems.length === 1}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Box sx={{ width: 300 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Total:</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>${total.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
            
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Additional Information</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    multiline
                    rows={3}
                    placeholder="Enter additional notes for the client"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Terms and Conditions"
                    value={termsAndConditions}
                    onChange={(e) => setTermsAndConditions(e.target.value)}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Invoice Summary</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>Client</Typography>
                  <Typography>
                    {clients.find(c => c.id === client)?.name || 'Not selected'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {clients.find(c => c.id === client)?.email || ''}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>Matter</Typography>
                  <Typography>{matter}</Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>Invoice Details</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Invoice Number:</Typography>
                    <Typography>{invoiceNumber}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Invoice Date:</Typography>
                    <Typography>{invoiceDate.toLocaleDateString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Due Date:</Typography>
                    <Typography>{dueDate.toLocaleDateString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Total Amount:</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>${total.toFixed(2)}</Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveInvoice}
                >
                  Save as Draft
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={handleSendInvoice}
                  color="primary"
                >
                  Send Invoice
                </Button>
              </Box>
            </Paper>
          </Box>
        );
        
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link 
          underline="hover" 
          color="inherit" 
          component={RouterLink} 
          to="/"
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Home
        </Link>
        <Link 
          underline="hover" 
          color="inherit" 
          component={RouterLink} 
          to="/invoices"
        >
          <ListIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Invoices
        </Link>
        <Typography color="text.primary">Create Invoice</Typography>
      </Breadcrumbs>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Create New Invoice</Typography>
        
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          component={RouterLink}
          to="/invoices"
        >
          Cancel
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      
      <Box sx={{ mb: 4 }}>
        {getStepContent(activeStep)}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSendInvoice}
            startIcon={<SendIcon />}
          >
            Send Invoice
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
          >
            Continue
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default InvoiceCreation;
