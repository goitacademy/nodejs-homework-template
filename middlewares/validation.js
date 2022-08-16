<<<<<<< HEAD
const createError = require("./createError");
=======
const { createError } = require("../helpers");
>>>>>>> 2e7b20b03c67d57065d0ce30119fda3b69001c54

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    next();
  };
};

module.exports = validation;
