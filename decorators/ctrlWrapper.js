export const ctrlWrapperAsync = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const ctrlWrapper = (controller) => {
  return (req, res, next) => {
    try {
      controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
