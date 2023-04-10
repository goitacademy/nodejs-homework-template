const { Contact } = require('../models/contacts');

const changeContact = async (req, res) => {
  console.log(req.params);
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    return res.status(404).json({ message: `${contactId} is not found` });
  }
  res.status(200).json(result);
};
module.exports = { changeContact };
