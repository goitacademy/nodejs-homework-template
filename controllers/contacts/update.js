const contacts = require("../../models/contacts.js");
const { RequestError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing fields" });
  } else {
    res.status(200).json(result);
  }
};

module.exports = updateContact;
