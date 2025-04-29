// src/components/document/DocumentUpload.jsx
import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Paper, 
  IconButton,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Breadcrumbs,
  Link
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SaveIcon from '@mui/icons-material/Save';

// Create styled components for file upload
const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const InvisibleInput = styled('input')({
  display: 'none',
});

function DocumentUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingStatus, setProcessingStatus] = useState("idle"); // idle, processing, success, error
  const [error, setError] = useState(null);
  
  // Steps for document upload process
  const steps = ['Upload Files', 'Process & Extract', 'Review & Save'];
  
  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      // Create file objects with preview URLs
      const newFiles = files.map(file => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
        status: 'pending',
        progress: 0
      }));
      
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };
  
  // Handle drop zone click
  const handleDropZoneClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);
      
      // Create file objects with preview URLs
      const newFiles = files.map(file => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
        status: 'pending',
        progress: 0
      }));
      
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };
  
  // Handle remove file
  const handleRemoveFile = (index) => {
    const newFiles = [...uploadedFiles];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newFiles[index].preview);
    
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };
  
  // Handle document processing
  const handleProcessDocuments = () => {
    if (uploadedFiles.length === 0) return;
    
    setProcessingStatus("processing");
    
    // Simulate processing with delay
    setTimeout(() => {
      // Update all files to processed status
      const completedFiles = uploadedFiles.map(file => ({
        ...file,
        status: 'processed',
        progress: 100
      }));
      
      setUploadedFiles(completedFiles);
      setProcessingStatus("success");
    }, 3000); // 3 seconds delay for simulation
  };
  
  // Handle next step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // Handle save documents
  const handleSaveDocuments = () => {
    // In a real app, this would send the data to the backend
    console.log('Saving documents:', uploadedFiles);
    
    // Navigate to the document list
    navigate('/documents');
  };

  // Render step content based on active step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upload your Documents
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Upload documents to extract information using OCR technology.
                  Supported formats: PDF, TIFF, JPG, PNG
                </Typography>
                
                <UploadBox
                  onClick={handleDropZoneClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <InvisibleInput
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.tiff,.jpg,.jpeg,.png"
                    multiple
                  />
                  
                  <CloudUploadIcon 
                    sx={{ 
                      fontSize: 60, 
                      color: 'text.secondary',
                      mb: 2 
                    }} 
                  />
                  <Typography variant="h6" gutterBottom>
                    Drag & Drop or Click to Upload
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload invoices, account statements, or related documents
                  </Typography>
                </UploadBox>
                
                {uploadedFiles.length > 0 && (
                  <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Uploaded Files ({uploadedFiles.length})
                    </Typography>
                    
                    <Stack spacing={1}>
                      {uploadedFiles.map((file, index) => (
                        <Box 
                          key={index}
                          sx={{ 
                            p: 1, 
                            border: '1px solid', 
                            borderColor: 'divider',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Box>
                              <Typography variant="body2">{file.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {(file.size / 1024).toFixed(2)} KB
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box>
                            <IconButton 
                              size="small" 
                              onClick={() => handleRemoveFile(index)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Process Documents
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Process the uploaded documents to extract information
                </Typography>
                
                {uploadedFiles.length > 0 ? (
                  <Box>
                    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Files to Process ({uploadedFiles.length})
                      </Typography>
                      
                      <Stack spacing={1}>
                        {uploadedFiles.map((file, index) => (
                          <Box 
                            key={index}
                            sx={{ 
                              p: 1, 
                              border: '1px solid', 
                              borderColor: 'divider',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                              <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body2">{file.name}</Typography>
                                <Box 
                                  sx={{ 
                                    mt: 0.5,
                                    height: 4, 
                                    width: '100%', 
                                    bgcolor: 'background.default',
                                    borderRadius: 5,
                                    overflow: 'hidden'
                                  }}
                                >
                                  <Box 
                                    sx={{ 
                                      height: '100%', 
                                      width: `${file.progress}%`, 
                                      bgcolor: file.status === 'processed' ? 'success.main' : 'primary.main',
                                      transition: 'width 0.3s ease-in-out'
                                    }} 
                                  />
                                </Box>
                              </Box>
                            </Box>
                            
                            <Typography variant="caption" sx={{ ml: 2 }}>
                              {file.status === 'processed' ? 'Processed' : 
                               file.status === 'processing' ? `${Math.round(file.progress)}%` : 
                               'Pending'}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <LoadingButton
                        loading={processingStatus === "processing"}
                        variant="contained"
                        onClick={handleProcessDocuments}
                        disabled={processingStatus === "success"}
                        startIcon={<DocumentScannerIcon />}
                        loadingPosition="start"
                      >
                        {processingStatus === "success" ? "Processing Complete" : "Process Documents"}
                      </LoadingButton>
                    </Box>
                  </Box>
                ) : (
                  <Alert severity="warning">
                    No files uploaded. Please go back and upload files first.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Review & Save
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Review extracted information and save documents
                </Typography>
                
                {uploadedFiles.length > 0 ? (
                  <Box>
                    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Processed Files ({uploadedFiles.length})
                      </Typography>
                      
                      <Stack spacing={1}>
                        {uploadedFiles.map((file, index) => (
                          <Box 
                            key={index}
                            sx={{ 
                              p: 1, 
                              border: '1px solid', 
                              borderColor: 'divider',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <DescriptionIcon sx={{ mr: 1, color: 'success.main' }} />
                              <Box>
                                <Typography variant="body2">{file.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {(file.size / 1024).toFixed(2)} KB • Processed
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Button
                              variant="text"
                              size="small"
                              startIcon={<VisibilityIcon />}
                            >
                              View Details
                            </Button>
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        onClick={handleSaveDocuments}
                        startIcon={<SaveIcon />}
                      >
                        Save Documents
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Alert severity="warning">
                    No files processed. Please go back and upload files first.
                  </Alert>
                )}
              </CardContent>
            </Card>
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
          to="/documents"
        >
          <DescriptionIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Documents
        </Link>
        <Typography color="text.primary">Upload</Typography>
      </Breadcrumbs>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Upload Documents</Typography>
        
        <Button 
          variant="outlined" 
          component={RouterLink}
          to="/documents"
        >
          All Documents
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
      
      {/* Display error if no files uploaded */}
      {activeStep === 0 && uploadedFiles.length === 0 && error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      
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
            onClick={handleSaveDocuments}
            endIcon={<SaveIcon />}
          >
            Save Documents
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              if (activeStep === 0 && uploadedFiles.length === 0) {
                setError('Please upload at least one document.');
              } else if (activeStep === 1 && processingStatus !== "success") {
                setError('Please process the documents before continuing.');
              } else {
                setError(null);
                handleNext();
              }
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Continue
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default DocumentUpload;
