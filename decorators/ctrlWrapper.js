const ctrlWrapper = (ctrl) => {
  const func = async (rew, res, next) => {
    try {
      await ctrl(rew, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};
export default ctrlWrapper;
