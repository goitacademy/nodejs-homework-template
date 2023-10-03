const ctrlWrapper = (ctrl) => {
  const func = async (reg, res, next) => {
    try {
      await ctrl(reg, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;
