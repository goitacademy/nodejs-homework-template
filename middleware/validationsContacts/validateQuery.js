import Joi from "joi";

const regLimit = /\d+/;

const querySchema = Joi.object({
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("name", "age", "email").optional(),
  sortByDesc: Joi.string().valid("name", "age", "email").optional(),
  filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp("(name|email|age)\\|?(name|email|age)+"))
    .optional(),
});
export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` });
  }
  next();
};
export default validateQuery;
