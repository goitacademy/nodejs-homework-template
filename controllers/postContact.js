const { addContact } = require('../models/contacts');
const { createReject } = require('../utils');

const postContact = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      throw createReject(400, {
        message: 'Missing required name field',
        status: 'Failure',
      });
    }
    const result = await addContact({ name, phone, email });
    res.status(201).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
