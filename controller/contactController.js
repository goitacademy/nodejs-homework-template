const Contact = require("../models/contact.model");

const listContacts = async (_id, page, perPage) => {
  // const { page, perPage } = req.query;
  // if (!page) {
  //   page = 1;
  // }
  // if (!perPage) {
  //   perPage = 20;
  // }
  // const limit = parseInt(perPage);
  // const skip = (page - 1) * perPage;
  // const contacts = await Contact.find(
  //   { owner: _id },
  //   {},
  //   { limit: limit, skip: skip }
  // );
  const contacts = await Contact.find({ owner: _id })
    .skip((page - 1) * perPage)
    .limit(perPage);
  return contacts;
};

const listFavoriteContacts = async (_id, page, perPage) => {
  const contacts = await Contact.find({ favorite: true, owner: _id })
    .skip((page - 1) * perPage)
    .limit(perPage);
  return contacts;
};

const getContactById = async (contactId, _id) => {
  const contacts = await Contact.findById(contactId, _id);
  return contacts;
};

const removeContact = async (contactId, _id) => {
  const contact = await Contact.deleteOne({ _id: contactId, owner: _id });
  return contact;
};

const addContact = async ({
  name,
  email,
  phone,
  favorite = false,
  owner: _id,
}) => {
  const contactNew = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });
  return contactNew;
};

const updateContact = async (contactId, body, _id) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: _id },
    body
  );
  return contact;
};

const updateStatusContact = async (contactId, body, _id) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: _id },
    body,
    {
      new: true,
    }
  );
  return contact;
};

module.exports = {
  listContacts,
  listFavoriteContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
