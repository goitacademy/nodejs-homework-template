const cntrlWrapper = (cntrl) => {
  const wrapper = async (requirement, response, next) => {
    try {
      await cntrl(requirement, response, next);
    } catch (error) {
      next(error);
    }
  };

  return wrapper;
};

module.exports = cntrlWrapper;
