import express from 'express';

import mongoose from 'mongoose';
import connectToDatabase from './db.js';

import authRoutes from './routes/api/authRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use(express.json());

app.use('/users', authRoutes);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});