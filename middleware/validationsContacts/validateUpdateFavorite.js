import Joi from "joi";

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (error) {
    const [{ type }] = error.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "missing field favorite" });
    }
    return res.status(400).json({ message: error.message.replace(/"/g, "") });
  }
  next();
};
export default validateUpdateFavorite;
