import Joi from "joi";

const docSchema = Joi.object({
  name: Joi.string().required("Set name for contact"),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean().default(false),
});

const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const validateContact = (req, res, next) => {
  const { error } = docSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateFavorite = (req, res, next) => {
  const { error } = patchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};
