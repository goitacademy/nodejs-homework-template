function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

// function HttpError(status, message) {
//   const err = new Error(message);
//   err.status = status;
//   return err;
// }

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

class NotFoundContact extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundContact";
    this.status = 404;
  }
}

class FailedToUpdate extends Error {
  constructor(message) {
    super(message);
    this.name = "FailedToUpdate";
    this.status = 400;
  }
}

module.exports = {
  tryCatchWrapper,
  // HttpError,
  ValidationError,
  NotFoundContact,
  FailedToUpdate,
};
