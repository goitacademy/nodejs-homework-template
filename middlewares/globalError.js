const globalError = (error, req, res, next) => {
  res.status(500).json({ message: error.message });
};

module.exports = globalError;
