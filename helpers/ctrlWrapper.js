const ctrlWrapper = (ctrl) => async (req, res, next) => {
  try {
    await ctrl(req, res);
  } catch (error) {
    next(error);
  }
};

module.exports = ctrlWrapper;
