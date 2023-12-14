const { httpError } = require("../units");

const validateFields = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res
        .status(400)
        .json({ errorMessages });
    }
    next();
  };
};
module.exports = validateFields;
