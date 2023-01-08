const { Contact } = require("../models/contactModel");

const listContacts = async (userId) => {
  try {
    // console.log(userId);
    const data = await Contact.find({ userId });
    console.log(data);
    return data;
  } catch (err) {
    // console.log("first");
    console.error(err);
  }
};
const getContactById = async (contactId) => {
  try {
    const data = await Contact.findById(contactId);

    return data;
  } catch (err) {
    console.error(err);
  }
};
const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndDelete(contactId);
  } catch (err) {
    console.error(err);
  }
};
const addContact = async (name, email, phone, favorite = false) => {
  try {
    const contact = new Contact({ name, email, phone, favorite });
    await contact.save();
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone, favorite = false } = body;
    await Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone, favorite },
    });
  } catch (err) {
    console.error(err);
  }
};
const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body;
    await Contact.findByIdAndUpdate(contactId, {
      $set: { favorite },
    });
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
