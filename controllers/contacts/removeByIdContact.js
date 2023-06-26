const contacts = require("../../models/contacts.js");
const { requestError } = require("../../utils//index.js");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(req.params);
  const result = await contacts.removeContact(contactId);
  if (!result) {
    // res.status(404).json({ message: "Not found" });
    throw requestError(404, "Not found");
  }
  res.status(200).json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
