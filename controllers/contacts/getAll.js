const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    '-createdAt -updatedAt',
    {
      skip,
      limit: Number(limit),
    }
  ).populate('owner', 'email subscription');

  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts, quantity: contacts.length },
  });
};

module.exports = getAll;
