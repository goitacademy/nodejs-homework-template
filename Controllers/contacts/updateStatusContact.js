const { Contact } = require('../../models');

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  );
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json(contact);
};

module.exports = updateStatusContact;
