const { Contact } = require("../models/contact");

const addContact = async (name, email, phone, favorite) => {
  try {
    const contact = new Contact(name, email, phone, favorite);
    contact.save();
    return contact;
  } catch (err) {
    console.log(err);
  }
};

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (_id) => {
  const contact = await Contact.findOne({ _id });
  return contact;
};

const removeContact = async (_id) => {
  try {
    return Contact.findByIdAndDelete({ _id });
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (id, newUser) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, newUser, {
    new: true,
  });
  return updatedContact;
};

const updateStatusContact = async (id, favorite) => {
  const updatedStatus = await Contact.findByIdAndUpdate(id, { favorite });
  updatedStatus.favorite = favorite;
  return updatedStatus;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
