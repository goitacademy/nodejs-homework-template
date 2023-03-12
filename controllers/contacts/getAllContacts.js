const contactsOperations = require('../../models/contacts');

const getAllContacts = async (req, res, next) => {
  try {
    const contactsList = await contactsOperations.listContacts();

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contactsList },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllContacts;
