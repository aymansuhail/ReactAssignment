const express = require('express');
const { Client } = require('pg');
require('dotenv').config();
const path = require('path');

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const connectionString = 'postgresql://aymansuhail:eoCV1yXptus0@ep-sparkling-limit-a57mzl0i.us-east-2.aws.neon.tech/Dummydata?sslmode=require';

const client = new Client({
  connectionString: connectionString
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database:', err));

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Endpoint to fetch all data
app.get('/customers', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM customer_info');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    next(err); 
  }
});

// Endpoint to fetch data by ID
app.get('/customers/:sno', async (req, res) => {
  const sno = req.params.sno;
  try {
    const result = await client.query('SELECT * FROM customer_info WHERE sno = $1', [sno]);
    if (result.rows.length === 0) {
      res.status(404).send('Customer not found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error('Error fetching data by ID:', err);
    next(err); // Pass error to the error handling middleware
  }
});

// Endpoint to delete a user by sno
app.delete('/customers/:sno', async (req, res) => {
  const sno = req.params.sno;
  try {
    const result = await client.query('DELETE FROM customer_info WHERE sno = $1 RETURNING *', [sno]);
    if (result.rows.length === 0) {
      res.status(404).send('Customer not found');
    } else {
      res.json({ message: 'Customer deleted successfully', deletedCustomer: result.rows[0] });
    }
  } catch (err) {
    console.error('Error deleting customer:', err);
    next(err); // Pass error to the error handling middleware
  }
});

app.post('/customers', async (req, res) => {
  const { customer_name, age, location, phone } = req.body;
  const created_at = new Date();
  try {
    const result = await client.query('INSERT INTO customer_info (customer_name, age, created_at, location, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *', [customer_name, age, created_at, location, phone]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating customer:', err);
    next(err); 
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
