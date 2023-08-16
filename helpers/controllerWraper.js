const conrollerWraper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      const { status = 500, message = "Server error" } = error;
      if (status === 500) {
        next(error);
      }
      res.status(status).json({ status: "fail", code: status, message });
    }
  };
};

module.exports = { conrollerWraper };
