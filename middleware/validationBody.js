const validationBody = (schema) => {
  return async (req, res, next) => {
    const err = {};
    const body = req.body;
    if (Object.keys(body).length === 0) {
      err.status = 400;
      err.message = "missing fields";
      next(err);
    } else {
      const { error } = await schema.validate(body);
      if (error) {
        error.status = 400;
        next(error);
      } else {
        next();
      }
    }
  };
};

module.exports = validationBody;
