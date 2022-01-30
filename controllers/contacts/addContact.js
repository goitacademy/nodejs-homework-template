const Contact = require('../../models/contact');

async function addContact(req, res, next) {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }
    next(error);
  }
}

module.exports = addContact;
