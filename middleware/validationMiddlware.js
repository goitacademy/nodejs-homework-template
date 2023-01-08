const { postSchema, putSchema } = require("../helpers/validationІSchemas");


const postValidation = async (req, res, next) => {
    const validationResult = postSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details });
    }
    next();
}

const putValidation = async (req, res, next) => {
  const validationResult = putSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details });
  }
  next();
};

module.exports = { postValidation, putValidation };