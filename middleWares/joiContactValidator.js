const Joi = require("joi");

const contactValidator = () => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    phone: Joi.string().min(7).max(15).required(),
    email: Joi.string().email().required(),
    favorite: Joi.bool(),
  });

  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: `missing required ${
          error.message.replace(/"/g, "").split(" ", 1)[0]
        } field`,
      });
    }
    next();
  };
};
const updContactValidator = () => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
  }).or("name", "email", "phone");

  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
    next();
  };
};

const favoriteValidator = () => {
  const schema = Joi.object({ favorite: Joi.bool() });

  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "missing field favorite",
      });
    }
    next();
  };
};

module.exports = { contactValidator, favoriteValidator, updContactValidator };
