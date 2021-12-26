import Joi from "joi";
import { MIN_AGE, MAX_AGE } from "../../lib/constants";

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone", "age");

const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (error) {
    const [{ type }] = error.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "missing fields" });
    }
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};
export default validateUpdate;
