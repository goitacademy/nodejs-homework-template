const contactSchema = require("../schemas/contactSchema");

const handleValidationError = (res, error) => {
  res.status(400).json({ message: error.message });
};

const handleNotFoundError = (res) => {
  res.status(404).json({ message: "Not found" });
};

const validateContact = async (req, res, next) => {
  try {
    await contactSchema.validateAsync(req.body);
    next();
  } catch (error) {
    handleValidationError(res, error);
  }
};

module.exports = {
  handleNotFoundError,
  validateContact,
};
