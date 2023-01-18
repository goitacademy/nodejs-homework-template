const tryCatchWrapper = (ctrl) => {
    return async (res, req, next) => {
      try {
        await ctrl(res, req, next);
      } catch (error) {
        next(error);
      }
    };
  };
  
  module.exports = tryCatchWrapper;