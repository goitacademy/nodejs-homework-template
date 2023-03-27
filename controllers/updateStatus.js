const { Contact } = require('../models/contacts');

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!result) {
    return res.status(404).json({ message: `${contactId} is not found` });
  }
  res.status(200).json(result);
};

module.exports = { updateStatus };
