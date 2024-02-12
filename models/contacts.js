const Contact = require("../schema/contact.schema");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const getContactById = async (contactId) => {
  try {
    return Contact.findOne({ _id: contactId });
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.deleteOne({ _id: contactId });
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = new Contact({ name, email, phone });
  try {
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    if (!name && !email && !phone) {
      const result = 400;
      return result;
    } else {
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $set: body },
        { new: true }
      );
      return updatedContact;
    }
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
};
