import Joi from "joi";
const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (error) {
    const [{ type }] = error.details;
    if (type === "object.unknown") {
      return res.status(400).json({ message: error.message.replace(/"/g, "") });
    }
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};
export default validateUpdate;
