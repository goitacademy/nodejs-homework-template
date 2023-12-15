const HttpError = (res, status, errorMessage) => {
  return res.status(status).json({ message: errorMessage });
};

module.exports = HttpError;
