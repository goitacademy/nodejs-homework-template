const Contact = require('../../models/contact');

async function getContacts(req, res, next) {
  try {
    const result = await Contact.find({}, '-__v');
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = getContacts;
