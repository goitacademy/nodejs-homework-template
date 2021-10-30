const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // const contacts = await Contact.find({ owner: userId }).populate({
  //   path: "owner",
  //   select: "email subscription createdAt updatedAt",
  // });
  const {
    filter,
    sortBy,
    sortByDesc,
    favorite = null,
    limit = 5,
    offset = 0,
  } = query;
  const searchOptions = { owner: userId };
  if (favorite !== null) {
    console.log(typeof favorite);
    searchOptions.favorite = favorite;
  }
  const results = await Contact.paginate(searchOptions, {
    offset,
    limit,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    populate: {
      path: "owner",
      select: "email subscription createdAt updatedAt",
    },
    // todo: пофиксить то, что пропадает populate
    select: filter ? filter.split("|").join(" ") : "",
  });
  const { docs: contacts } = results;
  delete results.docs;
  return { ...results, contacts };
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "email subscription createdAt updatedAt",
  });
  console.log(contact);
  return contact;
};

const removeContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return contact;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body, userId) => {
  const updateContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
