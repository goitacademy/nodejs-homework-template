const { Contact } = require('../models');
const { paginationLabels } = require('../helpers');

const addContact = newContact => {
  return Contact.create(newContact);
};

const listContacts = (userId, query) => {
  const {
    page,
    limit,
    offset,
    sortBy,
    favorite,
  } = query;

  const options = {
    page: page || 1,
    limit: limit || 20,
    offset: offset || [(page - 1) * limit],
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
    },
    favorite: favorite || null,
    customLabels: paginationLabels,
  };

  return Contact.paginate({}, options);
};

const getContactById = (userId, contactId) => {
  return Contact.findById({
    owner: userId,
    _id: contactId,
  });
};

const removeContact = (userId, contactId) => {
  return Contact.findByIdAndDelete({
    owner: userId,
    _id: contactId,
  });
};

const updateContact = (userId, contactId, data) => {
  return Contact.findByIdAndUpdate(
    {
      owner: userId,
      _id: contactId,
    },
    data,
    { new: true },
  );
};

const updateContactStatus = (userId, contactId, data) => {
  return Contact.findByIdAndUpdate(
    {
      owner: userId,
      _id: contactId,
    },
    data,
    { new: true },
  );
};

module.exports = {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  updateContactStatus,
};
