const { Contacts } = require("../../repositories");

const removeContact = async (req, res, _next) => {
  const { contactId } = req.params;
  const result = await Contacts.removeContact(contactId);
  if (!result) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
  return res.json({ message: "contact deleted" });
};

module.exports = removeContact;
