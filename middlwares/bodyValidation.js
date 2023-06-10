const { HttpError } = require("../helpers");

const postValidation = (schema) => {
  const validation = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(
        HttpError(400, `missing required ${error.message.split(" ")[0]} field`)
      );
    }

    next();
  };

  return validation;
};

const putValidation = (schema) => {
  const validation = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = schema.validate(req.body);

    if (error) {
      next(
        HttpError(400, `missing required ${error.message.split(" ")[0]} field`)
      );
    }

    next();
  };

  return validation;
};

const patchValidation = (schema) => {
  const validation = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, `missing field favorite`));
    }
    next();
  };
  return validation;
};

const authValidation = (schema) => {
  const validation = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return validation;
};

const userSubscrUpdate = (schema) => {
  const validation = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, `subscription invalid`));
    }
    next();
  };
  return validation;
};

module.exports = {
  postValidation,
  putValidation,
  patchValidation,
  authValidation,
  userSubscrUpdate,
};
