export const errorWrapper = controller => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    return next(error);
  }
};
