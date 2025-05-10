// index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Simple home route
app.get('/', (req, res) => {
  res.send('PH Monitoring API is running!');
});

// Endpoint to receive pH readings
app.post('/submit-ph', async (req, res) => {
  const { tank_id, ph_value, timestamp } = req.body;

  try {
    await pool.query(
      'INSERT INTO ph_readings (tank_id, ph_value, timestamp) VALUES ($1, $2, $3)',
      [tank_id, ph_value, timestamp]
    );
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error saving data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
