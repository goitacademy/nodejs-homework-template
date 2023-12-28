const Contact = require("../service/schemas/contact");

const readContacts = async () => {
  try {
    return Contact.find();
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

const writeContacts = async (contacts) => {
  try {
    await Contact.insertMany(contacts);
  } catch (error) {
    console.error(error.message);
  }
};

const getById = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const removeContact = async (id) => {
  try {
    const result = await Contact.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const addContact = async ({ name, email, phone }) => {
  const newContact = new Contact({ name, email, phone });
  try {
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const updateContact = async (id, { name, email, phone }) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

module.exports = {
  readContacts,
  writeContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
