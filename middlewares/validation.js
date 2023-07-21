const { HttpError } = require("../utils");


const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(400, `${error.message}` );
    }

    next();
  };
};

module.exports = validation
