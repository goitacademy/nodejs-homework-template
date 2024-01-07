const contactValidation = require("./validateContacts");
const services = require("../services");

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

exports.checkOwnerForContact = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user;
  const isOwner = await services.checkedContactByUser(contactId, owner);
  if (!isOwner) {
    return res.status(403).json({ message: "You are not an owner" });
  }
  next();
};
