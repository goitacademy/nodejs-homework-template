const validationAuth = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (req.method === "POST" && error) {
      const missingField = error.details[0].path[0];
      res.status(400).json({
        message: `missing required ${missingField} field`,
      });
      return;
    }
    next();
  };
};

module.exports = validationAuth;
