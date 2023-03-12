const wrapper = (action) => {
  return async (req, res, next) => {
    try {
      await action(req, res, next);
    } catch (error) {
        next(error);
    }
};
};

module.exports = wrapper;

//   await console.log(await action(req, res, next))