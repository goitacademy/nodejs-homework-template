const { Contacts } = require("../models/contact");
const { HttpError } = require("../utils");

const userContacts = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  console.log(owner, _id);
  const result = await Contacts.find({ owner, _id });
  if (!result || !result.length) {
    next(HttpError(404, "Not found"));
  }
  next();
};

module.exports = userContacts;
