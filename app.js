const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

require('dotenv').config();
// console.log(process.env.JWT_SECRET);

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

startServer();

module.exports = app;