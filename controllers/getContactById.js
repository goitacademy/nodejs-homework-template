const contactsModel = require('../models/contacts');

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log('Requested contact ID:', contactId);

  try {
    const contact = await contactsModel.getContactById(contactId);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getContactById;
