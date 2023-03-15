const operations = require('../../models/contactsOperations');

const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
