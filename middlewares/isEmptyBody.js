const { HttpError } = require("../middlewares/httpError");
const {
  validationFavorite,
} = require("../utils/validation/contactValidationSchemas");

const IsEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, `Missing fields`));
  }

  next();
};

const IsEmptyBodyFavorite = (req, res, next) => {
  const { error } = validationFavorite.validate(req.body);

  if (error) {
    return next(
      HttpError(400, `Missing ${error.details[0].context.key} fields`)
    );
  }

  next();
};

module.exports = {
  IsEmptyBody,
  IsEmptyBodyFavorite,
};
