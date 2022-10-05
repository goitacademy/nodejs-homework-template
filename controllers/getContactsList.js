const { listContacts } = require('../models/contacts');

const getContactsList = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactsList;
