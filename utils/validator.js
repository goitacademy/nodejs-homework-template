const { dataValidator, favoriteValidator } = require("./dataValidator");
const { Types } = require("mongoose");
const httpErr = require("./HTTPErr");

const validator = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = dataValidator(req.body);

  if (!name && !email && !phone) {
    next(httpErr(400, "Missing fields"));
  }

  if (error) {
    const err = error.details[0].path[0];

    next(httpErr(400, `Missing required '${err}' field`));
  }
  next();
};

const favoriteValidate = async (req, res, next) => {
  const { error } = favoriteValidator(req.body);

  if (error) {
    next(httpErr(400, "Missing field favorite"));
  }

  next();
};

const validateId = async (req, res, next) => {
  const { contactId } = req.params;

  const isValidId = Types.ObjectId.isValid(contactId);

  if (!isValidId) {
    next(httpErr(400, "Unvalid ID"));
  }

  next();
};

const userValidator = async (req, res, next) => {
  res.json(req.body);
};

module.exports = { validator, favoriteValidate, validateId, userValidator };
