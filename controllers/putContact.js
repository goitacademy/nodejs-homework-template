const { Contacts } = require('../models/contacts');
const { createReject } = require('../utils');

const putContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      throw createReject(404, 'Not found');
    }

    const response = { ...result._doc, ...req.body };
    res.status(200).json({ status: 'Succsess', data: response });
  } catch (error) {
    next(error);
  }
};

module.exports = putContact;
