import Joi from "joi";

export const schema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
  phone: Joi.string()
    .pattern(
      /^\+?(\d{10,12}|(38|)(\s?(\(\d{3}\)\s?|\d{3}\s)(\d{7}|\d{3}(\s|-)\d{2}(\s|-)?\d{2})))$/
    )
    .required(),
    favorite: Joi.boolean(),
});

export function validateData(schema) {
  return async (req, res, next) => {
    try {
      req.body = await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const message = error.details.map((i) => i.message).join(",");
      res.status(400).json({ error: message });
    }
  };
}
