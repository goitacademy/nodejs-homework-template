const { Contact } = require('../../models/index');
const { HttpSuccess } = require('../../helpers');
const { has } = require('lodash');

const getContacts = async (req, res) => {
  const { query } = req;
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.limit) || 20;
  const direction = query.sortDirection?.toLowerCase() || 'desc';
  const { id } = req.user;

  // do filter only if filter comes
  const favFilter = {
    owner: id,
    ...(has(req.query, 'favorite') && { favorite: req.query.favorite }),
  };

  const result = await Contact.find(favFilter)
    .populate('owner', '_id email')
    .sort({ _id: direction })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .exec();
  const totalContacts = await Contact.countDocuments(favFilter);

  const data = {
    contacts: result,
    page,
    totalPages: Math.ceil(totalContacts / pageSize),
    totalContacts,
  };

  return res.json({ data });
};
module.exports = getContacts;
