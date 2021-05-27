const Contact = require('./schemas/contact');

// const contacts = require("./contacts.json");

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 20,
    page = 1,
    offset = 0,
  } = query;
  console.log(Boolean(favorite));
  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }
  const results = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'name  -_id',
    },
  });
  const { docs: contacts, totalDocs: total } = results;
  return { contacts, total, limit, offset, page };
};

const getContactById = async (userId, contactId) => {
  const results = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner ',
    select: 'name email subscription -_id',
  });
  return results;
};

const removeContact = async (userId, contactId) => {
  const results = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return results;
};

const addContact = async (userId, body) => {
  try {
    const results = await Contact.create({ ...body, owner: userId });
    return results;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    throw error;
  }
};

const updateContact = async (userId, contactId, body) => {
  const results = await Contact.findByIdAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true }
  );
  return results;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
