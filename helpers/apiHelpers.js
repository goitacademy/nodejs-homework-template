const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  console.log("HANDLEEEERRR ERRRORR:", err);
  // res.status(500).json({ err: { ...err, message: err.message } });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
