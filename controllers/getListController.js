const contacts = require('../../models/contacts');

const getListController = async (req, res, next) => {
  try {
    const list = await contacts.listContacts();
    res.json(list);
  } catch (error) {
    next(error);
  }
};

module.exports = getListController;
