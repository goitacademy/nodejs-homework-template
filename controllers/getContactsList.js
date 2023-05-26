const { allContacts } = require('../models/contacts');

const getContactsList = async (_, res, next) => {
  try {
    const result = await allContacts();
    res.status(200).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactsList;