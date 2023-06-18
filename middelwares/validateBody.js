const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const fn = (req, res, next) =>  {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" })
    }
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message })
    }

    next(error);
  };
  return fn;
};
module.exports = validateBody;