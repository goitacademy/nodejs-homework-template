const Contact = require('../../models/contactModel');

exports.getContactById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const findedContact = await Contact.findById(contactId);

    if (!findedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(findedContact);
  } catch (error) {
    res.sendStatus(500);
  }
};
