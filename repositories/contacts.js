const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // const result = await Contact.find({ owner: userId });
  const {
    page = 1,
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 3,
  } = query;
  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }
  const result = await Contact.paginate(optionsSearch, {
    page,
    limit,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
  });
  return result;
};

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email subscription",
  });

  return result;
};

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
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
