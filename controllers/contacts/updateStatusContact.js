const { Contact } = require('../../models/contact-schema');

const updateStatusContact = async (req, res, next) => {
  const { favorite } = req.body;
  if (!favorite) return res.status(400).json({ message: 'missing field favorite' });
  const response = await Contact.findByIdAndUpdate(req.params.contactId, req.body);
  if (response) return res.json(response);
  return res.status(404).json({ message: 'Not found' });
};

module.exports = updateStatusContact;
