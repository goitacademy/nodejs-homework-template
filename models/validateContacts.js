const validatePostContact = (schema) => {
  const middleware = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.label;
      res.status(400).json(`Missing required '${missingField}' field`);
      return;
    }
    next();
  };
  return middleware;
};
const validatePutContact = (schema) => {
  const middleware = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json("missing fields");
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        const missingField = error.details[0].context.label;
        res.status(400).json(`Missing required '${missingField}' field`);
      }
    }
    next();
  };
  return middleware;
};

module.exports = { validatePostContact, validatePutContact };
