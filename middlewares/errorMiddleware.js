const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  if (err.isJoi) {
    // Obsługa błędów walidacyjnych Joi
    return res.status(400).json({
      message: err.details[0].message,
    });
  }

  res.status(500).json({
    message: "Something went wrong on the server.",
    error: err.message,
  });
};

module.exports = errorMiddleware;
