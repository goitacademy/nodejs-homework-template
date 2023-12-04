const { Contact } = require("../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.json(contact);
};

module.exports = updateContact;
