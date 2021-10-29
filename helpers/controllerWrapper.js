const asyncWrapper = (callbacks) =>
  callbacks.map((callback) =>
    async (req, res, next) => {
      try {
        return callback(req, res, next);
      } catch (error) {
        next(error);
      }
    },
  )
;

module.exports = asyncWrapper;
