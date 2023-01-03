const {
  RegistrationConflictError,
  LoginAuthError,
  VerificationError,
  BadRequestError,
} = require("./errors");
const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};
const errorHandler = (err, req, res, next) => {
  if (
    err instanceof RegistrationConflictError ||
    err instanceof LoginAuthError ||
    err instanceof VerificationError ||
    err instanceof BadRequestError
  ) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};
module.exports = {
  asyncWrapper,
  errorHandler,
};
