const { Contact } = require("../models");

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.json(contact);
};

module.exports = updateContactStatus;
