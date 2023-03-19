const Contact = require("../service/shemas/contact");

const AppError = require("../utils/appError");

const listContacts = async () => {
  try {
    return await Contact.find().select("-__v");
  } catch (error) {
    return new AppError(500, error);
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById({ _id: contactId });
  } catch (error) {
    return new AppError(500, error);
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    return new AppError(500, error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    return await Contact.create({ name, email, phone });
  } catch (error) {
    return new AppError(500, error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone, favorite } = body;
    return await Contact.findByIdAndUpdate(
      { _id: contactId },
      { name, email, phone, favorite },
      { new: true }
    );
  } catch (error) {
    return new AppError(500, error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
