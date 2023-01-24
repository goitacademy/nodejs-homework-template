const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const idSchema = Joi.object({ id: Joi.string().required() });

const validateCreate = async (req, res, next) => {
  try {
    const value = await createSchema.validateAsync(req.body);
  } catch (e) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, "")}` });
  }
  next();
};
const validateUpdate = async (req, res, next) => {
  try {
    const value = await updateSchema.validateAsync(req.body);
  } catch (e) {
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res.status(400).json({ message: error.message.replace(/"/g, "") });
    }
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};
const validateId = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params);
  } catch (e) {
    return res
      .status(400)
      .json({ message: ` ${error.message.replace(/"/g, "")}` });
  }
  next();
};

module.exports = { validateCreate, validateUpdate, validateId };
