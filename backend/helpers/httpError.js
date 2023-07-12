const errorMessagesList = {
  400: 'Bad Request',
  401: 'Not authorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};
const HttpError = (status, message = errorMessagesList[status]) => {
  const error = new Error(message);
  error.status = status;
  console.log(error);
  return error;
};
const express = require('express');

const app = express();

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message, stack: err.stack });
});
module.exports = HttpError;