const decorCtrlWrapp = ctlr => {
  const func = async (req, res, next) => {
    try {
      await ctlr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = decorCtrlWrapp;
