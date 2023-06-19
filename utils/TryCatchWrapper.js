const TryCatchWrapper = (controller) => {
    const inner = async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        next(error);
      }
    };
    return inner;
  };
  
  module.exports = TryCatchWrapper;