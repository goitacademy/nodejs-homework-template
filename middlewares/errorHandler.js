function handleCatchErrors(middleware) {
  return async function (req, res, next) {
    try {
      await middleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}



module.exports = handleCatchErrors;