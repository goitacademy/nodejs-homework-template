import Joi from "joi";
import { MIN_AGE, MAX_AGE } from "../../lib/constants";
const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
});

const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};
export default validateCreate;
