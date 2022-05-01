const ctrlWrapper = controller => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    next(error);
  }
};

module.exports = ctrlWrapper;
