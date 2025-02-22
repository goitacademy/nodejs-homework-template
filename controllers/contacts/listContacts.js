const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let allContacts = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email');

  if (favorite) {
    allContacts = await Contact.find({ owner, favorite }, '-createdAt -updatedAt', {
      skip,
      limit,
    }).populate('owner', 'email');
  }
  res.json(allContacts);
};

module.exports = listContacts;