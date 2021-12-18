const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log(error.status);
      if (error.message.includes("Contact with")) {
        error.status = 404;
      }
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
