const validatePostContact = (schema) => {
  const middleware = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json(`missing required name field`);
    }
    next();
  };
  return middleware;
};
const validatePutContact = (schema) => {
  const middleware = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json("missing fields");
    }
    next();
  };
  return middleware;
};

module.exports = { validatePostContact, validatePutContact };
