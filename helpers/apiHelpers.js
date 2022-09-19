const { CurrentProjectError } = require("./errors");

const ctrlWrapper = (controller) => (req, res, next) => {
  controller(req, res).catch(next);
};

const unknownRouteHandler = (req, res) => {
  res.status(404).json({ message: "Not found" });
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof CurrentProjectError) {
    res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

module.exports = { ctrlWrapper, unknownRouteHandler, errorHandler };
