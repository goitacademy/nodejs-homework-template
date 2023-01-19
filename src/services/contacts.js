const { Contact } = require("../models/contactModel");

const listContacts = async (userId) => {
  console.log(userId);
  try {
    const data = await Contact.find({ userId });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
const getContactById = async (contactId, userId) => {
  try {
    console.log(contactId);
    const data = await Contact.findById(contactId, userId);

    return data;
  } catch (err) {
    console.error(err);
  }
};
const removeContact = async (contactId, userId) => {
  try {
    await Contact.findByIdAndDelete(contactId, userId);
  } catch (err) {
    console.error(err);
  }
};
const addContact = async ({ name, email, phone, favorite = false }, userId) => {
  try {
    const contact = new Contact({ name, email, phone, favorite, userId });
    await contact.save();
  } catch (err) {
    console.error("err", err);
    throw err;
  }
};

const updateContact = async (contactId, body, userId) => {
  try {
    const { name, email, phone, favorite = false } = body;
    await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: { name, email, phone, favorite },
      },
      userId
    );
  } catch (err) {
    console.error(err);
  }
};
const updateStatusContact = async (contactId, body, userId) => {
  try {
    const { favorite } = body;
    await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: { favorite },
      },
      userId
    );
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
