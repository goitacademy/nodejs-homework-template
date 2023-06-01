const userValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    console.log(error);
    if (error) {
      res.status(400).json(error.message);
    }

    next();
  };

  return func;
};

module.exports = userValidateBody;
