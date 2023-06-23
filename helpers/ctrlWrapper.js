const ctrlWrapper = ctrl => {
  const wrapper = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      // this redirects to Error handler in app.js
      next(error);
    }
  };
  return wrapper;
};

module.exports = ctrlWrapper;
