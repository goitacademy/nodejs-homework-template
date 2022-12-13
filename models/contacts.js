const { ContactModel } = require("./contactsModel");

const listContacts = async () => {
  try {
    const data = await ContactModel.find({});
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await ContactModel.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await ContactModel.findByIdAndRemove(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await ContactModel.create(body);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    await ContactModel.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    const data = await ContactModel.findById(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const updateStatusContact = async (contactId, body) => {
  try {
    const data = await ContactModel.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return data;
  } catch (error) {
    console.log(error.message);
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
