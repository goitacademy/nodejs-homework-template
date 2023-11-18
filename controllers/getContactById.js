
const contactsModel = require('../models/contactModel');

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsModel.getContactById(id, res);

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
