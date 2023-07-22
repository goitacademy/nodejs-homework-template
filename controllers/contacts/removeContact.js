const Contact = require('../../models/contactModel');

exports.removeContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.sendStatus(500);
  }
};
