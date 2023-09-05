const Contact = require("./schemas/contactSchema");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error("There was an error when retrieving contacts list.", error);
    return null;
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findOne({ _id: contactId });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findOneAndDelete({ _id: contactId });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    console.error("Error adding new contact: ", error);
    return { message: "Failed to add contact." };
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(
      { _id: contactId },
      { $set: body },
      { new: true }
    );
  } catch (error) {
    console.error("Error while updating contact", error);
    return null;
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(
      { _id: contactId },
      { $set: body },
      { new: true }
    );
  } catch (error) {
    console.error("Error while updating contact", error);
    return null;
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
