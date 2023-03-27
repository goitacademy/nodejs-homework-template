const { Contact } = require('../models/contacts');
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    return res.status(404).json({ message: `${contactId} is not found` });
  }
  res.status(200).json({ message: `${contactId} contact deleted` });
};
module.exports = { deleteContact };
