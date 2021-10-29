const wrapper = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    switch (error.name) {
      case "ValidationError":
        res
          .status(400)
          .json({ status: "error", code: 400, message: error.message });
        break;
      case "CustomError":
        res
          .status(error.status)
          .json({
            status: "error",
            code: error.status,
            message: error.message,
          });
        break;
      default:
        next(error);
        break;
    }
  }
};

module.exports = wrapper;
