const Contact = require('./schemas/contacts');
const User = require('./schemas/users');

const listContacts = async () => {
  const response = await Contact.find();
  return response
};

const getContactById = async (contactId) => {
  const response = await Contact.findOne({ _id: contactId });
  return response
};

const removeContact = async (contactId) => {
  const response = await Contact.findByIdAndRemove({ _id: contactId });
  return response
};

const addContact = async ({ body }) => {
  const { name, email, phone } = body;
  const response = await Contact.create({ name, email, phone });
  return response
};

const updateContact = async (contactId, { updatedData }) => {
  const response = await Contact.findByIdAndUpdate({ _id: contactId }, updatedData, { new: true });
  return response
};

const updateStatusContact = async (contactId, favorite) => {
  const response = await Contact.findByIdAndUpdate({ _id: contactId }, favorite, { new: true });
  return response
};

const userSignup = async (body) => {
  const response = await User.create({ email, password });
  return response
};

const userLogin = async (body) => {
  const response = await User.findById(email);
  return response
};

const userLogout = async (body) => { 
  // const response = await User.
}

const userCurrent = async () => {

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  userSignup,
  userLogin,
  userLogout,
  userCurrent,
}