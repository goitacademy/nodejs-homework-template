const { Contacts } = require("../db/contactModel");

const getContacts = async () => {
  const data = await Contacts.find({});
  return data;
};

const addContact = async ({ name, email, phone }) => {
  const data = await Contacts.create({ name, email, phone });
  return data;
};

const getContactById = async (id) => {
  try {
    const data = await Contacts.findById(id);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const deleteContactById = async (id) => {
  try {
    await Contacts.findByIdAndDelete(id);
  } catch (error) {
    console.error(error.message);
  }
};

const putContactById = async (id, { name, email, phone }) => {
  try {
    await Contacts.findByIdAndUpdate(id, { name, email, phone });
  } catch (error) {
    console.error(error.message);
  }
};

const updateStatusContact = async (id, favorite) => {
  try {
    await Contacts.findByIdAndUpdate(id, { favorite });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getContacts,
  addContact,
  getContactById,
  deleteContactById,
  putContactById,
  updateStatusContact,
};
