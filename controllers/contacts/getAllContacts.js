const { Contact } = require('../../models');

const getAllContacts = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 10, favorite = '' } = req.query;
  const maxLimit = Number(limit) > 10 ? 10 : Number(limit);
  const skip = (page - 1) * limit;

  if (favorite === '') {
    const contacts = await Contact.find({ owner: _id }, '-createdAt -updatedAt', {
      skip,
      limit: maxLimit,
    }).populate('owner', 'name email');

    const data = await Contact.find({ owner: _id });

    res.json({ total: data.length, data: contacts });
  } else {
    const contacts = await Contact.find({ owner: _id, favorite }, '-createdAt -updatedAt', {
      skip,
      limit: maxLimit,
    }).populate('owner', 'name email');

    const data = await Contact.find({ owner: _id, favorite });

    res.json({ total: data.length, data: contacts });
  }
};

module.exports = getAllContacts;