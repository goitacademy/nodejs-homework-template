
const isValidData = (schemas) => {
  const validateContact = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error, value } = schemas.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        message: errorMessages.join(", "),
      });
    }

    req.body = value;
    next();
  };
  return validateContact;
};

module.exports = isValidData;
