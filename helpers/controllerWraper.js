const connrollerWraper = (conctollers) => {
  const func = async (req, res, next) => {
    try {
      await conctollers(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = connrollerWraper;
