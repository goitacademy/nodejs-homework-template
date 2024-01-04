const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const authMiddleware = require('./middlewares/authMiddleware');


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// MongoDB connection string
const uri = "mongodb+srv://vspasedust:eaiyDSBkLIZ623xy@cluster0.kz32p8l.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

// Connect to MongoDB when the application starts
connectToDatabase();

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Middleware for checking the token
app.use(authMiddleware);

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});


module.exports = app;
