const contactsOperation = require('../../model');

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    if (!contacts) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
