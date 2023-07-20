const Contact = require('../../models/contactModel');

exports.removeContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.sendStatus(500);
  }
};
