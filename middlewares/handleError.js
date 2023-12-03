const HttpError = require("../common/models/HttpError")

const handleError = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode);
    res.json({
      statusCode: err.statusCode,
      message: err.message,
      error: err.error,
    });
  } else {
    res.status(500);
    res.json({
      statusCode: 500,
      message: 'Something is wrong',
      error: err.message,
    });
  }
}; 

module.exports = handleError;