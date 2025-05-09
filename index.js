// index.js
import express from 'express';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect to PostgreSQL/TimescaleDB using Railway URL
const db = postgres(process.env.DATABASE_URL, { ssl: 'require' });

// ✅ Your route to receive pH data
app.post('/submit-ph', async (req, res) => {
  const { tank_id, ph_value, timestamp } = req.body;

  try {
    await db`
      INSERT INTO ph_readings (tank_id, ph_value, timestamp)
      VALUES (${tank_id}, ${ph_value}, ${timestamp})
    `;
    res.sendStatus(200);
  } catch (error) {
    console.error('DB insert error:', error);
    res.status(500).send('Error saving data');
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

