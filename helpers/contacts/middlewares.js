const ctrlWrapper = controller => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

const validateRequest =
  (schema, reqParamsType = 'body') =>
  (req, res, next) => {
    const { error } = schema.validate(req[reqParamsType]);
    if (error) {
      return res.status(400).send(error);
    }
    next();
  };

module.exports = { ctrlWrapper, validateRequest };
