const Joi = require("joi");

exports.validateSignUpSchema = (req, res, next) => {
  const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    subscription: Joi.string()
      .valid("starter", "pro", "business")
      .default("starter"),
    //   token: Joi.string().required(),
  });
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

exports.validateLoginSchema = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

// exports.validateLogoutSchema = (req, res, next) => {
//     const logoutSchema = Joi.object({

//       token:
//     });
//     const { error } = logoutSchema.validate(req.body);
//     if (error) {
//       return res.status(400).send(error.message);
//     }
//     next();
//   };
