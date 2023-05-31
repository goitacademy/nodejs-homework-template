const { HttpError } = require("../helpers");

function bodyValidatorWrapper(schema) {
  function bodyValidator(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const requiredFields = ["name", "email", "phone"];
    const missingFields = [];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }
    if (missingFields.length > 0) {
      const errorMessage = `Missing required ${missingFields.join(
        " and "
      )} field(s)`;
      return res.status(400).json({ message: errorMessage });
    }

    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  }

  return bodyValidator;
}

module.exports = {
  bodyValidatorWrapper,
};
