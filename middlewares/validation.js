const addValid = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `missing required ${error.details[0].context.label} field`,
      });
    }
    next();
  };
};

const updateValid = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `missing field`,
      });
    }
    next();
  };
};

const updateStatus = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `missing field favorite`,
      });
    }
    next();
  };
};

module.exports = { addValid, updateValid, updateStatus };
