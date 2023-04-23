const { schemaUpdateStatusContact } = require("../models/contact");

const validateUpdateStatusContact = (req, res, next) => {
  const { error } = schemaUpdateStatusContact.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

module.exports = validateUpdateStatusContact;
