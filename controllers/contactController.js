const { Contact } = require("../models/contact");

const listContacts = async (options) => {
  const { favorite } = options;
  if (favorite) {
    const contacts = await Contact.paginate({ favorite }, options);
    return contacts;
  } else {
    const contacts = await Contact.paginate({}, options);
    return contacts;
  }
};

const getContactById = async (_id) => {
  return await Contact.findOne({ _id });
};

const removeContact = async (_id) => {
  await Contact.findOneAndDelete({ _id });
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();
  return contact;
};

const updateContact = async (_id, body) => {
  await Contact.findByIdAndUpdate(_id, body);
  return await getContactById(_id);
};

const updateContactStatus = async (_id, body) => {
  await Contact.findByIdAndUpdate(_id, body);
  return await getContactById(_id);
};

const showOnlyFavoriteContacts = async (favorite) => {
  return await Contact.find({ favorite });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
  showOnlyFavoriteContacts,
};