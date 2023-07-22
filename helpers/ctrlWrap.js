const ctrlWrap = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      console.log("ctrl :>> ", ctrl);
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrap;
