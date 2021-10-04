const contactsOperation = require('../../model/contacts/');

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsOperation.getAllContacts();
    res.json({
      status: 'sucsess',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
