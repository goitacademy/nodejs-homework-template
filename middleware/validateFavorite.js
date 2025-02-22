const { setFavoriteSchema } = require("../models/contact");

const validateFavorite = (req, res, next) => {
  const { error } = setFavoriteSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      message: errorMessage,
    });
  }
  return next();
};

module.exports = validateFavorite;
