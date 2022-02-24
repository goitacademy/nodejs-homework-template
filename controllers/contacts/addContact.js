const { addingContact } = require('../../models/contacts');

const addContact = async (req, res, next) => {
  try {
    const { body } = req;
    const contact = await addingContact(body);
    res
      .status(201)
      .json({ status: 'success', code: 201, payload: { contact } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = addContact;
