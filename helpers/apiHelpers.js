const { default: mongoose } = require("mongoose");
const { ValidationError, WrongParamsError } = require("./errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError || error instanceof WrongParamsError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(500).json({ message: error.message });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
