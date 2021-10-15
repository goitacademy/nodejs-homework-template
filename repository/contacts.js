const Contacts = require('../model/schemaContact');

const listContacts = async (userId, query) => {
  // const result = await Contacts.find({ owner: userId }).populate({
  //   path: 'owner',
  //   select: ' email subscription  ',
  // });

  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    page = 1,
  } = query;
  const searchOptions = { owner: userId };

  if (favorite !== null) {
    searchOptions.favorite = favorite;
  }

  const results = await Contacts.paginate(searchOptions, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',

    populate: {
      path: 'owner',
      select: ' email subscription  ',
    },
  });
  const { docs: contacts } = results;
  delete results.docs;

  return { ...results, contacts };
};

const getContactById = async (contactId, userId) => {
  const result = await Contacts.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: ' email subscription  ',
  });

  return result;
};

const removeContact = async (contactId, userId) => {
  const result = await Contacts.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });

  return result;
};

const addContact = async body => {
  const result = await Contacts.create(body);

  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contacts.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  );

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
