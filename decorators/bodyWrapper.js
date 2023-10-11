const bodyWrapper = (body) => {
  const func = async (req, res, next) => {
    try {
      await body(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default bodyWrapper;
