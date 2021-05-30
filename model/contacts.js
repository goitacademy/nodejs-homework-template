const dataContacts = require('./schemas/contactSchema');

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    page = 0,
  } = query;
  const searchOptions = { owner: userId };
  if (favorite !== null) {
    searchOptions.favorite = favorite;
  }
  const results = await dataContacts.paginate(searchOptions, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'name email',
    },
  });
  return results;
};

const getContactById = async (userId, id) => {
  const result = await dataContacts
    .findById({ _id: id, owner: userId })
    .populate({
      path: 'owner',
      select: 'name email',
    });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await dataContacts
    .findByIdAndRemove({
      _id: id,
      owner: userId,
    })
    .populate({
      path: 'owner',
      select: 'name email',
    });
  return result;
};

const addContact = async (userId, body) => {
  const result = await dataContacts.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await dataContacts
    .findByIdAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true })
    .populate({
      path: 'owner',
      select: 'name email',
    });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
