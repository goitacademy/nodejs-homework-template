// const asyncWrapper = (controller) => {
//   return (req, res, next) => {
//     controller(req, res).catch(next);
//   };
// };

const errorHandlerNotFound = (req, res) => {
  res.status(404).json({ message: "Not found" });
};

const errorHandlerServerError = (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

module.exports = {
  // asyncWrapper,
  errorHandlerNotFound,
  errorHandlerServerError,
};
