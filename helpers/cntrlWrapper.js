const cntrlWrapper = (cntrl) => {
  const func = async (requirement, response, next) => {
    try {
      await cntrl(requirement, response, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = cntrlWrapper;
