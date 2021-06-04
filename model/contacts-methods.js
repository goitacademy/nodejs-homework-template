const Contact = require('./contacts-schema');

const getAllContacts = async (userId, query) => {
  const { sortBy, sortByDesc, favorite = null, limit = 5, offset = 0 } = query;

  const searchOptions = { owner: userId };

  if (favorite !== null) {
    searchOptions.favorite = favorite;
  }

  return await Contact.paginate(searchOptions, {
    limit,
    offset,
    sort: { ...(sortBy ? { [sortBy]: 1 } : {}), ...(sortByDesc ? { [sortByDesc]: -1 } : {}) },
    populate: {
      path: 'owner',
      select: 'email subscription',
    },
  });
};

const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription',
  });
};

const addContact = async body => {
  return await Contact.create(body);
};

const removeContact = async (userId, contactId) => {
  return await Contact.findOneAndDelete({ _id: contactId, owner: userId });
};

const updateContact = async (userId, contactId, body) => {
  return await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, { ...body }, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
