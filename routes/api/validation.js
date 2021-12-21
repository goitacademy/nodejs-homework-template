import req from "express/lib/request";
import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
}).or("name", "emaul", "phone");

const idSchema = Joi.object({ id: Joi.string().required() });

export const validateCreate = async (req, res, next) => {
  try {
    const value = await createSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `field ${err.message.replace(/'/, "")}` });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    const value = await updateSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export const validateId = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `field ${err.message.replace(/'/, "")}` });
  }
  next();
};
