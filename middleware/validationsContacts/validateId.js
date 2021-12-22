import Joi from "joi";
const idSchema = Joi.object({ id: Joi.string().required() });
const validateId = async (req, res, next) => {
  try {
    await idSchema.validateAsync(req.params);
  } catch (error) {
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};
export default validateId;
