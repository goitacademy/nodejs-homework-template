const { User } = require("../models/user");
const validatePostContact = (schema) => {
  const middleware = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.label;
      res
        .status(400)
        .json({ message: `Missing required '${missingField}' field` });
      return;
    }
    next();
  };
  return middleware;
};
const validateRegister = (schema) => {
  const middleware = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.label;
      res
        .status(400)
        .json({ message: `Missing required '${missingField}' field` });
      return;
    }
    const emailExists = await User.exists({ email: req.body.email });
    if (emailExists) {
      res.status(409).json({ message: "Email in use" });
      return;
    }
    next();
  };
  return middleware;
};
const validatePutContact = (schema) => {
  const middleware = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        const missingField = error.details[0].context.label;
        res
          .status(400)
          .json({ message: `Missing required '${missingField}' field` });
        return;
      }
    }
    next();
  };
  return middleware;
};

const validatePatchContact = (schema) => {
  const middleware = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing field favorite" });
      return;
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
    }
    next();
  };
  return middleware;
};

module.exports = {
  validatePostContact,
  validatePutContact,
  validatePatchContact,
  validateRegister,
};
