import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const idSchema = Joi.object({ id: Joi.string().required() });

export const validateCreate = async (req, res, next) => {
  try {
    const value = await createSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, "")}` });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    const value = await updateSchema.validateAsync(req.body);
  } catch (error) {
    const [{ type }] = error.details;
    if (type === "object unknown") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export const validateId = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params);
  } catch (error) {
    return res
      .status(400)
      .json({ message: ` ${error.message.replace(/"/g, "")}` });
  }
  next();
};
