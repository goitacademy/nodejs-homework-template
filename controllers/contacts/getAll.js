const contactsOptions = require('../../models/contacts');

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsOptions.listContacts();
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
