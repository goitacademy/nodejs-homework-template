const { HttpError } = require("../helpers");
const { Contact } = require("../models");

const checkOwnership = async (req, res, next) => {
  const { _id } = req.user;
  const contact = await Contact.findById(req.params.contactId);
  if (_id.toString() !== contact.owner.toString()) {
    next(HttpError(403));
  }
  next();
};

module.exports = checkOwnership;
