const handleErrors = (res, error) => {
  console.error("Error during registration:", error);
  res.status(500).json({ error: "Internal server error" });
};

const regControllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.error("Error", error);
      handleErrors(res, error);
    }
  };
};

module.exports = {
  regControllerWrapper: regControllerWrapper,
};
