const Contact = require('../../models/contacts/schemaContact');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res
      .status(200)
      .json({ status: 'success', code: 200, payload: { contacts } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getContacts;
