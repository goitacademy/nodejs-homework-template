const asyncWrapper = (models) => {
  return (req, res, next) => {
    models(req, res).catch(next);
  };
};

module.exports = {
  asyncWrapper,
};
