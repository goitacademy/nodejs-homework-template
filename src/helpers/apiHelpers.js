const { ContactsApiError } = require("./errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof ContactsApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.code === 11000 && err.name === "MongoServerError") {
    return res.status(409).json({ message: err.message });
  }

  res.status(500).json({ message: err.message });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
