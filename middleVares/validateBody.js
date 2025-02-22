const { HttpError } = require("../helpers");

const { schemas } = require("../models/contact");

const validateBody = async (req, res, next) => {
  const { error } = await schemas.addSchema.validate(req.body);

  const emptyBody = Object.keys(req.body);
  if (!emptyBody.length) {
    return HttpError(400, `missing fields`);
  }
  if (error) {
    const missingFieldName = error.details[0].message;

    return HttpError(400, missingFieldName);
  }
};

module.exports = validateBody;
