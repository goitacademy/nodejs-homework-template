import Joi from "joi";

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const validationUpdate = async (req, res, next) => {
  try {
    const value = await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type !== "object.unknown") {
      return res
        .status(400)
        .json({ message: `${err.message.replace(/"/g, "")}` });
    }

    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export default validationUpdate;
