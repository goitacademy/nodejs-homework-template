const errorMiddleware = (err, req, res, next) => {
  if (err.message === "User not exists!" || err.message === "Wrong password!") {
    return res.status(401).json({ message: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: err.message,
  });
};

module.exports = {
  errorMiddleware,
};
