const validateMiddleware = (req, res, next) => {
  console.log('validete middleware')
  next();
}

module.exports = validateMiddleware;
