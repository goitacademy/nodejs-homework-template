class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class WrongParametersError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof WrongParametersError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

module.exports = {
  ValidationError,
  WrongParametersError,
  errorHandler,
};
