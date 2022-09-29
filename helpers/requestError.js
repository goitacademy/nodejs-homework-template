const RequestError = (req, res, next) => {
  next();
};
module.exports = { RequestError };
