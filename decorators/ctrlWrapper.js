const ctrlWrapper = (getFunction) => {
  const func = async (req, res, next) => {
    try {
      await getFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;
