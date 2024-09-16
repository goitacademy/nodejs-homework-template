module.exports = (fn) => (req, res, next) => {
  try {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  } catch (err) {
    next(err);
  }
};