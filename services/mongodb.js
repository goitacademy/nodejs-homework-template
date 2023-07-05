const Contact = require("./schemas/contact");

const getContacts = async () => {
  console.log(await Contact.find());
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const addContact = async (contact) => {
  try {
    return await Contact.create(new Contact(contact));
  } catch (error) {
    return { message: error.message };
  }
};

const deleteContact = async (id) => {
  try {
    return await Contact.findByIdAndRemove(id);
  } catch (_) {
    return { message: "Not found" };
  }
};

const updateContact = async (id, contact) => {
  try {
    return await Contact.findByIdAndUpdate(id, contact, { returnDocument: "after" });
  } catch (_) {
    return { message: "Not found" };
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
};
