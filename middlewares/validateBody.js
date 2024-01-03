const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (isEmptyObject(req.body)) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ message: errorMessages.join(", ") });
    }
  };
  return func;
};

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = validateBody;
