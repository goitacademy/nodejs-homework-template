const errorHandler = (controller) => {
<<<<<<< HEAD
    return async (req, res, next) => {
      try {
        await controller(req, res);
      } catch (error) {
        next(error);
      }
    };
  };
  
  module.exports = errorHandler;
=======
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = errorHandler;
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99
