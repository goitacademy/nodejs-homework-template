const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);

  res.json(contact);
};

module.exports = removeContact;
