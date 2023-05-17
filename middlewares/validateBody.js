const { HttpErorrs } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: `missing field` });
      return;
    }
    if (error) {
      res.status(400).json({
        message: `missing required ${error.details[0].context.key} field`,
      });
      return;
    }
    next();
  };

  return func;
};

module.exports = validateBody;
