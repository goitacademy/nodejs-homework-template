const Joi = require("joi");
const { usersSchema } = require("../schema");

const addUserValidation = (req, res, next) => {
  const { error } = usersSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }

  next();
};

module.exports = addUserValidation;
