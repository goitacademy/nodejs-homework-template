const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./db');
const contactRoutes = require('./routes/contacts');
const userRoutes = require('./routes/users');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const path = require('path');
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));