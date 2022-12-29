export const errorHandler = cb => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
