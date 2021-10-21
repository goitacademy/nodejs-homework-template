const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // const result = await Contact.find({ owner: userId }).populate({
  //   path: "owner",
  //   select: "name email ",
  // });
  const { sortBy, sortByDesc, limit = 5, offset = 5 } = query;
  const searchOptions = { owner: userId };
  const results = await Contact.paginate(searchOptions, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    populate: { path: "owner", select: "name email " },
  });
  const { docs: contacts } = results;
  delete results.docs;
  return { ...results, contacts };
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    id: contactId,
    owner: userId,
  }).populate({ path: "owner", select: "name email " });
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const updateStatusContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { id: contactId, owner: userId },
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
  updateStatusContact,
};
