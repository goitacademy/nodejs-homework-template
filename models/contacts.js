const Contact = require("../service/schema/contact");


const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findOne({ _id: contactId });
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    console.log("Error adding new contact: ", error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove({ _id: contactId });
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
  } catch (error) {
    console.error(error);
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
