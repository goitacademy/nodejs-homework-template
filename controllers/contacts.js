const { Contact } = require("../models/contact");
const { hashPassword } = require("../models/user");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getContactById = async (_id) => {
  try {
    const contact = await Contact.findOne({ _id });
    return contact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeContact = async (_id) => {
  try {
    return await Contact.findByIdAndDelete(_id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addContact = async (name, email, phone, password) => {
  const hashedPassword = hashPassword(password);
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateContact = async (_id, newContact) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(_id, newContact);
    if (!updatedContact) {
      return null;
    }
    return updatedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
    console.error(error);
    throw error;
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
