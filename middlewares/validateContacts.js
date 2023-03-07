const validNewContact = (schema) => {
  return (req, res, next) => {
    const { err } = schema.validate(req.body);
    if (err) {
      return res.status(400).json({ message: "Missing required name field!" });
    }

    return next();
  };
};

const validUpdateContact = (schema) => {
  return (req, res, next) => {
    const { err } = schema.validate(req.body);
    if (err) {
      return res.status(400).json({ message: "Missing field!" });
    }

    return next();
  };
};

module.exports = { validNewContact, validUpdateContact };
