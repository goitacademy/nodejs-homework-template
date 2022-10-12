const { Contacts } = require('../models/contacts');
const { createReject } = require('../utils');

const delateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndRemove(contactId);
    if (!result) {
      throw createReject(404, 'Not found');
    }
    res.status(200).json({ message: 'Contact deleted', status: 'Succsess' });
  } catch (error) {
    next(error);
  }
};

module.exports = delateContact;
