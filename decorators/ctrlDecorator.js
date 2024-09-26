const ctrlWrapper = (ctrl) => {
  const funk = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return funk;
};

export default ctrlWrapper;
