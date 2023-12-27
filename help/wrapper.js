const wrapper = (wrap) => {
  const func = async (req, res, next) => {
    try {
      await wrap(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = wrapper;
