// const contactMethod = require("../../repository/index");
// const { updateContact } = contactMethod.updateContact;

const ContactsService = require("../../services/contacts/contacts");

const putUpdateContact = async (req, res) => {
  const contact = await ContactsService.update(
    req.params.contactId,
    req.body,
    req.user
  );

  return res
    .status(201)
    .json({ status: "success", code: 201, payload: { contact } });
};

module.exports = {
  putUpdateContact,
};
