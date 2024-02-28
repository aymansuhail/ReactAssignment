const express = require('express');
const { Client } = require('pg');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors()); // Note: Use cors() instead of cors
const PORT = process.env.PORT || 3000;

const connectionString = 'postgresql://aymansuhail:eoCV1yXptus0@ep-sparkling-limit-a57mzl0i.us-east-2.aws.neon.tech/Dummydata?sslmode=require';

const client = new Client({
  connectionString: connectionString
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database:', err));

// Endpoint to fetch all data
app.get('/customers', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM customer_info');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
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
    res.status(500).send('Error fetching data by ID');
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
    res.status(500).send('Error deleting customer');
  }
});


// Handling unhandled routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal server error:', err);
  res.status(500).send('Internal server error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
