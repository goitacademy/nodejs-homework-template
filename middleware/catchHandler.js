const catchHandler = (controller) => async (req, res, next) => {
  try {
    const result = await controller(req, res, next);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { catchHandler };
