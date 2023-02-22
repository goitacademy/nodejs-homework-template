const Joi = require("joi");
const contactValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
});

async function validatePost(req, res, next) {
  const { name, email, phone } = req.body;
  if (!name || !phone || !email)
    return res.status(400).json({ message: "missing required name field" });

  try {
    await contactValidationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
}
async function validatePut(req, res, next) {
  const { name, phone, email } = req.body;
  if (!name && !phone && !email)
    return res.status(400).json({ message: "missing fields" });
  try {
    await contactValidationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
}
module.exports = {
  validatePost,
  validatePut,
};
