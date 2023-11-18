const express = require('express');
const mongoose = require('mongoose');
const connectToDatabase = require('./db');

const authRoutes = require('./routes/api/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


connectToDatabase();


app.use(express.json());


app.use('/users', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
