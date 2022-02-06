const Contact = require('../../models/contact');

async function getContacts(req, res, next) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner: _id }, '-__v', { skip, limit: Number(limit) }).populate(
      'owner',
      'email'
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = getContacts;
