const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    const bodyKeys = Object.keys(req.body);

    if (bodyKeys.length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error } = schema.validate(req.body);

    if (error) {
      throw new RequestError(400, error.message);
    }

    next();
  };
};

module.exports = validateBody;
