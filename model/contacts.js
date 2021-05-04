const Contacts = require('./schemas/contacts');

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    offset = 0,
  } = query;

  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }
  const result = await Contacts.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : []),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : []),
    },
    select: filter ? filter.split().join(' ') : '',
    populate: {
      path: 'owner',
      select: 'email subscription name',
    },
  });
  return result;
};

const getContactById = async (userId, id) => {
  const resolt = await Contacts.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription name',
  });
  return resolt;
};

const addContact = async (userId, body) => {
  console.log(body);
  const resolt = await Contacts.create({ ...body, owner: userId });
  return resolt;
};

const updateContact = async (userId, id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  );

  return result;
};

const updateStatusContact = async (userId, id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  );

  return result;
};

const removeContact = async (userId, id) => {
  const resolt = await Contacts.findByIdAndRemove({ _id: id, owner: userId });
  return resolt;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
