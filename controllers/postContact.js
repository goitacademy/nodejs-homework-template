const { Contacts } = require('../models/contacts');
const { createReject } = require('../utils');

const postContact = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      throw createReject(400, 'Missing required name field');
    }
    const result = await Contacts.create({ name, phone, email });
    res.status(201).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
