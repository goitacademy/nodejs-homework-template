const validateContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) throw new Error("Error");
    next();
  };
  return func;
};

module.exports = { validateContact };
