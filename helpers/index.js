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

module.exports = {
  tryCatchWrapper,
};
