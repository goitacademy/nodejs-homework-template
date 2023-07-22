const Contact = require('../../models/contactModel');

exports.getContactById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const findedContact = await Contact.findById(contactId);

    res.status(200).json(findedContact);
  } catch (error) {
    res.sendStatus(500);
  }
};
