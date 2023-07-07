const { setFavoriteSchema } = require("../models/joiSchemas");

const validateFavorite = (req, res, next) => {
  const { error } = setFavoriteSchema.validate(req.body);
  if (error) {
    // const [value] = error.message.match(/"\w*"/);
    // console.log(value);
    res
      .status(400)
      .json({ message: `missing field favorite` });
  } else {
    next();
  }
};

module.exports = validateFavorite;
