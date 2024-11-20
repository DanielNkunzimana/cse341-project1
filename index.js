const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Routers
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const swaggerRouter = require('./routes/swaggerRoutes');

// Load environment variables
dotenv.config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const DB = process.env.MONGODB_URI;

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.error('DB connection error:', err));

// Routes
app.use('/', swaggerRouter);
app.use('/', viewRouter);
app.use('/api', userRouter);

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
