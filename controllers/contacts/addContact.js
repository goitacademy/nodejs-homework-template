const Contact = require('../../models/contact');

async function addContact(req, res, next) {
  try {
    console.log(req.user.id);
    const data = { ...req.body, owner: req.user.id };

    const result = await Contact.create(data);
    res.status(201).json(result);
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }
    next(error);
  }
}

module.exports = addContact;
