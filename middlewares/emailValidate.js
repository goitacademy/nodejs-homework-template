const emailValidate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    console.log(error);
    if (error) {
      res.status(400).json({ message: "missing required field email" });
    }

    next();
  };

  return func;
};

module.exports = emailValidate;
