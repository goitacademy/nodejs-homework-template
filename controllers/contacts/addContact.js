// const contactMethod = require("../../repository/index");
// const { addContact } = contactMethod.addContact;
const ContactsService = require("../../services/contacts/contacts");

const postAddContact = async (req, res) => {
  const contact = await ContactsService.create(req.body, req.user);
  if (contact) {
    return res
      .status(201)
      .json({ status: "success", code: 201, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = {
  postAddContact,
};
