const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};
module.exports = {
  asyncWrapper,
};
