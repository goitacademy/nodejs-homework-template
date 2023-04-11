const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.error(error.message);
      // next(res.status(404).json({ message: "Not found" }));
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
