const { Contact } = require("../models/contact");

const listContactsService = async (owner, keys, queryParams) => {
  return await Contact.find({ owner }, keys, queryParams).populate(
    "owner",
    "email"
  );
};

const getContactsByFavoriteService = async (
  owner,
  keys,
  { skip, limit, favorite }
) => {
  return await Contact.find({ owner, favorite }, keys, {
    skip,
    limit,
    favorite,
  }).populate("owner", "email");
};

const getContactByIdService = async (contactId) => {
  return (await Contact.findById(contactId)) || null;
};

const addContactService = async (body) => {
  return await Contact.create(body);
};

const updateContactService = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
};

const removeContactService = async (contactId) => {
  await Contact.findByIdAndDelete(contactId);

  return { message: "contact deleted" };
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  getContactsByFavoriteService,
};
