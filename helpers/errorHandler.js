const wrapper = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    switch (error.name) {
      case "ValidationError":
        return res
          .status(400)
          .json({ status: "Error", code: 400, message: error.message });
      case "CustomError":
        return res.status(error.status).json({
          status: "Error",
          code: error.status,
          message: error.message,
        });
      default:
        next(error);
        break;
    }
  }
};

module.exports = wrapper;
