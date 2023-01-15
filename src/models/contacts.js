const mongoose = require("mongoose");
const { schema } = require("../service/schemas/contact");
const Contacts = mongoose.model("contacts", schema);
const { HttpError } = require("../httpError");

const getContactsService = async ({ limit = 0 }) => {
  try {
    const contacts = await Contacts.find({}).limit(limit);
    return contacts;
  } catch (error) {
    throw new HttpError("Not found", 404);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contacts.findById(contactId);
    return contact;
  } catch (error) {
    throw new HttpError("Not found", 404);
  }
};

const removeContact = async (contactId) => {
  try {
    return Contacts.findByIdAndRemove({ _id: contactId });
  } catch (error) {
    throw new HttpError("Not found", 404);
  }
};

const addContact = async (body) => {
  const contact = await Contacts.create(body);
  return contact;
};

const updateContact = async (contactId, body) => {
  try {
    const contact = await Contacts.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return contact;
  } catch (error) {
    throw new HttpError("Not found", 404);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const contact = await Contacts.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    console.log(contact);
    return contact;
  } catch (error) {
    throw new HttpError("Not found", 404);
  }
};

module.exports = {
  getContactsService,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
