import Joi from "joi";

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const patchingContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const idSchema = Joi.object({ id: Joi.string().required() });

export const addContactValidation = async (req, res, next) => {
  try {
    const value = await addContactSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, "")}` });
  }
  next();
};

export const patchingContactValidation = async (req, res, next) => {
  try {
    const value = await patchingContactSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};

export const idValidation = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params);
  } catch (error) {
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};
