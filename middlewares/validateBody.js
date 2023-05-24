const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    // if (Object.keys(body).length === 0) {
    //   res.status(400).json({ message: "missing fields" });
    //   // throw HttpError(400, "missing fields");
    // }
    console.log(1);
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing field favorite" });
    }
    next();
  };

  return func;
};

module.exports = validateBody;
