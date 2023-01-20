function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

//**Example 1 */
// class HttpError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "HttpError";
//   }
// }

//**Example 2 */
// function HttpError(status, message) {
//   const err = new Error(message);
//   err.status = status;
//   return err;
// }
//** *//

// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "ValidationError";
//     this.status = 400;
//   }
// }

// class NotFoundContact extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "NotFoundContact";
//     this.status = 404;
//   }
// }

// class FailedToUpdate extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "FailedToUpdate";
//     this.status = 400;
//   }
// }

// class DuplicateKeyError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "DuplicateKeyError";
//     this.status = 409;
//   }
// }

// class MissedUserError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "MissedUserError";
//     this.status = 409;
//   }
// }

// class WrongPasswordError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "WrongPasswordError";
//     this.status = 409;
//   }
// }

module.exports = {
  tryCatchWrapper,
  // ValidationError,
  // NotFoundContact,
  // FailedToUpdate,
  // DuplicateKeyError,
  // MissedUserError,
  // WrongPasswordError,
};
