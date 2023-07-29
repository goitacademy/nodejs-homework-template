const validationSubscrBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      error.message = `${error.message.replace(/"/g, "")}`;
      next(error);
    }

    if (value.subscription === undefined) {
      error.status = 400;
      error.message = "missing field subscription";
      next(error);
    }

    next();
  };
};

module.exports = validationSubscrBody;
