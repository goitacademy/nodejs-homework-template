// Walidacja danych wejściowych
import Joi from "joi";

const requiredSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});


const validation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

export { validation };

