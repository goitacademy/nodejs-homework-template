const { Contacts } = require('../models/contacts');
const { createReject } = require('../utils');

const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.findById(contactId);
    if (!result) {
      throw createReject(404, 'Not found');
    }
    res.status(200).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = getOneContact;
