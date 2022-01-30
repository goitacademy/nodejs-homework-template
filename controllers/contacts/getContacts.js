const Contact = require('../../models/contact');

async function getContacts(req, res, next) {
  try {
    const result = await Contact.find({}, '-__v');
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
}

module.exports = getContacts;
