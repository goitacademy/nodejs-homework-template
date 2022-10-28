const { Contacts } = require('../../models/contacts');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { pages = 1, limit = 10 } = req.query;
  const skip = (pages - 1) * limit;
  const result = await Contacts.find(
    { owner },
    '-createdAt -updateAt',
    { skip, limit }.populate('owner', 'name email')
  );
  res.json(result);
};

module.exports = getAll;
