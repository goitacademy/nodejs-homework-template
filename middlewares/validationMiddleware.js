const { BadRequest } = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      throw new BadRequest("missing fields");
    }
    if (error) {
      const [er] = error.details[0].path;
      throw new BadRequest(`missing required ${er} field`);
    }

    next();
  };
};

module.exports = validation;
