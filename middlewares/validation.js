const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      next(error);

      return;
    }

    next();
  };
};

module.exports = validation;
