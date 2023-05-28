const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
    }

    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        messege: `missing required ${error.details[0].context.key} field`,
      });
    }

    // if (error) {
    //   res.status(400).json({ message: error.message });
    // }

    next();
  };

  return func;
};

module.exports = validateBody;
