const validationBody = (schema) => {
  return async (req, res, next) => {
    const body = req.body;
    const { error } = await schema.validate(body);
    if (error) {
      error.status = 400;
      next(error);
    } else {
      next();
    }
  };
};

module.exports = validationBody;
