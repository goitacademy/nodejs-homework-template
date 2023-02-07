function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

class Errors {
  constructor(message) {
    this.message = message;
    this.status = "Error";
  }
}

class ValidationError extends Errors {
  constructor(message) {
    super(message);
    this.status = "ValidationError";
  }
}

module.exports = {
  tryCatchWrapper,
  ValidationError,
};
