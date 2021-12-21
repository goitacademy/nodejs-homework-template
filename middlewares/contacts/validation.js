import Joi from "joi";

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const idSchema = Joi.object({ id: Joi.string().required() });

export const validateAdd = async (req, res, next) => {
  try {
    const value = await addSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    const value = await updateSchema.validateAsync(req.body);
  } catch (err) {
    console.log(err.details);
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res.status(400).json({ message: err.message });
    }
    if (type === "object.missing") {
      return res.status(400).json({ message: err.message.replace(/"/g, "") });
    }
    return res.status(400).json({ message: `missing fields` });
  }
  next();
};

export const validateId = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `${err.message.replace(/"/g, "")}` });
  }
  next();
};
