const handleNotFound = (err, req, res, next) => {
  if (err.message === "Not found") {
    res.status(404).json({ message: "Not found" });
  } else {
    next(err);
  }
};

const handleBadRequest = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).json({ message: err.message });
  } else {
    next(err);
  }
};

const handleInternalServerError = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};

export { handleNotFound, handleBadRequest, handleInternalServerError };
