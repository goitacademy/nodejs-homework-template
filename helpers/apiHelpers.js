const ctrlWrapper = (controller) => (req, res, next) => {
  controller(req, res).catch(next);
};

const unknownRouteHandler = (req, res) => {
  res.status(404).json({ message: "Not found" });
};

const errorHandler = (error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;

  res.status(status).json({ message });
};

module.exports = { ctrlWrapper, unknownRouteHandler, errorHandler };
