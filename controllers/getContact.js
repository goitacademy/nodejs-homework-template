const { Contact } = require('../models/contacts');

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    return res.status(404).json({ message: `${contactId} is not Found` });
  }
  res.json(result);
};

module.exports = { getContact };
