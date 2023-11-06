import Joi from "joi";

const schema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const contactFavoriteSchema = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};
