import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validationCreate = async (req, res, next) => {
  try {
    const value = await createSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type !== "any.required") {
      return res
        .status(400)
        .json({ message: `${err.message.replace(/"/g, "")}` });
    }
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};
export default validationCreate;
