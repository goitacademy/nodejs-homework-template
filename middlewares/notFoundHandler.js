const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "This route doesn't  exist" });
};

module.exports = notFoundHandler;