/**
 * Express request handler wrapper.
 * Catch errors.
 */
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(() =>
    res.status(500).json({ message: "Server Error" })
  );
};
module.exports={catchAsync}