const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (typeof error !== "undefined") {
      res.status(400).send(error.details.map((err) => err.message).join(", "));
    }
    next();
  };
  return func;
};

module.exports = { validateBody };
