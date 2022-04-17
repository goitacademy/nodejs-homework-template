// const contactMethod = require("../../repository/index");
// const { removeContact } = contactMethod.removeContact;

const ContactsService = require("../../services/contacts/contacts");

const delRemoveContact = async (req, res, next) => {
  const contact = await ContactsService.remove(req.params.contactId, req.user);

  return res.json({ status: "success", code: 200, payload: { contact } });
};

module.exports = {
  delRemoveContact,
};
