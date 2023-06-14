const decorCtrWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (err) {
    next(err);
  }
};

module.exports = decorCtrWrapper;
