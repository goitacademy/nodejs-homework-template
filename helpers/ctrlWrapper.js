const cntrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {}
  };
  return func;
};

module.exports = cntrlWrapper;
