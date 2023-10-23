module.exports = clb => async (req, res, next) => {
  try {
    await clb(req, res, next);
  } catch (error) {
    next(error);
  }
};
