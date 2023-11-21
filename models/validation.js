// const Joi = require("joi");

// const RegisterSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email(),
//   password: Joi.string().min(6).required(),
//   subscription: Joi.string()
//     .valid("starter", "pro", "business")
//     .default("starter"),
// });

// const schemas = { RegisterSchema };

// module.exports = {
//   schemas,
// };

const validation = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).send("Email is required!");
  }
  if (password === undefined) {
    return res.status(401).send("Email is required!");
  }
  next();
};

module.exports = validation;
