const contactMethod = require("../../models/contacts/index");

const { removeContact } = contactMethod.removeContact;

const delRemoveContact = async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = {
  delRemoveContact,
};
