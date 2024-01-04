const contactValidation = require("./validateContacts");

exports.checkAddContact = async (req, res, next) => {
  if (req.method === "POST") {
    const validateResult = contactValidation.addSchema.validate(req.body);
    if (validateResult.error) {
      return res.status(400).json({ message: validateResult.error });
    }
    next();
  }
};

exports.checkUpdateContact = async (req, res, next) => {
  const validateResult = updateSchema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({ message: validateResult.error });
  }
  next();
};

exports.checkUpdateStatusContact = async (req, res, next) => {
  const validateResult = contactValidation.updateStatusSchema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({ message: validateResult.error });
  }
  next();
};
