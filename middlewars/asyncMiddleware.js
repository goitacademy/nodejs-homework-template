const asyncMiddleware = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    console.error(error.message);
    next(new Error('Internal server error'));
  }
};


module.exports = asyncMiddleware;