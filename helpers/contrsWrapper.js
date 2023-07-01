const contrsWrapper = (contr) => {
  const func = async (res, req, next) => {
    try {
      await contr(res, req, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};
module.exports = contrsWrapper;
