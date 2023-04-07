const contactsModule = require('../../models/contacts');

const getAll = async (req, res, next) => {
  console.log('get All');
  try {
    const contacts = await contactsModule.listContacts();
    console.log(contacts);
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

module.exports = getAll;
