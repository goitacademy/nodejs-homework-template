import Joi from "joi";

const idSchema = Joi.object({
  id: Joi.string().required(),
});

const validationId = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params);
  } catch (err) {
    return res
      .status(404)
      .json({ message: `${err.message.replace(/"/g, "")}` });
  }
  next();
};
export default validationId;
