const { Contact } = require("../db/contactModel");

const listContactsDB = async () => {
  try {
    const contacts = await Contact.find({});

    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getByIdDB = async (contactId) => {
  const contact = Contact.findOne({ _id: contactId });
  return contact;
};

const addContactDB = async ({ name, email, phone }) => {
  try {
    const contact = new Contact({ name, email, phone });
    await contact.save();
  } catch (err) {
    console.log(err.message);
  }
};

const removeContactDB = async (contactId) => {
  try {
    await Contact.findByIdAndRemove({ _id: contactId });
  } catch (err) {
    console.log(err.message);
  }
};

const updateContactDB = async ({ name, email, phone, contactId }) => {
  try {
    await Contact.findByIdAndUpdate(
      { _id: contactId },
      { set: { name, email, phone } }
    );
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContactsDB,
  getByIdDB,
  addContactDB,
  removeContactDB,
  updateContactDB,
};
