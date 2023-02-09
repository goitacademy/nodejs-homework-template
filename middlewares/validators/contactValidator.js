const Joi = require("joi");

const middleware = (schema, property) => {
  return (req, res, next) => {
    console.log('Joi', Joi) 
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      res.status(422).json({ error: message });
    }
  };
};

module.exports = middleware;
