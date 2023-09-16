const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const authRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express();

// Determine the logging format based on the environment
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Middleware for request logging
app.use(logger(formatsLogger));

// Middleware for enabling CORS
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes for user authentication and contact management
app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

// Middleware for handling 404 errors (Not Found)
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Middleware for handling errors and sending appropriate responses
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;

// This code sets up an Express application with various middleware and routes:

// It configures the application to use different logging formats based on the environment (development or production).

// It enables CORS using the cors middleware, allowing cross-origin requests.

// It adds middleware for parsing JSON request bodies using express.json().

// It sets up two routes for user authentication (/api/users) and contact management (/api/contacts) using the respective routers.

// It defines middleware to handle 404 errors, responding with a "Not Found" message // for routes that do not match any defined routes.

// It defines error-handling middleware to handle and send appropriate responses for // server errors, including setting the HTTP status code based on the error's status // and sending an error message.

// This Express application can be used as a foundation for building a RESTful API that manages user authentication and contacts.
