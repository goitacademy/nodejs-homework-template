const validBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        res.status(400).json({
          message: "missing " + error.details[0].message + " field",
        })
      );
    }
    next();
  };
  return func;
};

const validEmptyBody = () => {
  const func = (req, res, next) => {
    const bodyEmpty = Object.keys(req.body).length === 0;
    if (bodyEmpty) {
      next(res.status(400).json({ message: "missing fields" }));
    }
    next();
  };
  return func;
};

module.exports = { validBody, validEmptyBody };