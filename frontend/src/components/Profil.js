// src/components/Profil.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

function Profil() {
    const [input, setInput] = useState('');
    const [responseMessage, setResponseMessage] = useState('');


  const handleSubmit = () => {
    fetch('http://localhost:5000/api/save_input/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: input })
    })
      .then(response => response.json())
      .then(data => {
        setResponseMessage(data.message);
        setInput('');  // Clear input field after saving
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        What are your investment goals?:
      </Typography>
      <TextField
        label="Enter text"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
      {responseMessage && (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          {responseMessage}
        </Typography>
      )}
    </Paper>
  );
}

function InvestmentGoalsTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios
        .get('http://localhost:5000/api/output/')
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    return (
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your investment goals:
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Input</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
}


export {Profil, InvestmentGoalsTable};