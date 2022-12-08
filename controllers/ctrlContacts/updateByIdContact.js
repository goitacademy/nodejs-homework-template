const contacts = require("../../models/contacts");
const { checkNull } = require("../../helpers");

const updateByIdContact = async (req, res) => {
  const {
    body,
    params: { contactId },
  } = req;

  const result = await contacts.updateContact(contactId, body);

  checkNull(result);

  res.status(201).json(result);
};

module.exports = updateByIdContact;
