const { Contact } = require("../models/contact");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (_id) => {
  const contact = await Contact.findOne({_id});
  return contact;
};

const removeContact = async (_id) => {
  try {
    return Contact.findByIdAndDelete({ _id });
  } catch (error) {
    console.log(error);
}
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (_id, newContact) => {
  const updateContact = await Contact.findByIdAndUpdate(_id, newContact);
  if (!updateContact) {
    return null
  }
  return updateContact;
};

const updateStatus = async (_id, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
};