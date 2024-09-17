const globalError = (error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something, went wrong, please try again later",
  });
};

module.exports = { globalError };
