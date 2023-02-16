const ctrlWrapper = (ctrl) => {
    return async (request, response, next) => {
      try {
        await ctrl(request, response, next);
      } catch (error) {
        next(error);
      }
    };
  };
  
  module.exports = ctrlWrapper;
  