const { Contacts } = require('../models/contacts');

const getContactsList = async (_, res, next) => {
  try {
    const result = await Contacts();
    res.status(200).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactsList;