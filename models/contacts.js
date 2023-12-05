const mongoose = require("mongoose");
const { Schema } = mongoose;
const HttpError = require("../helpers/HttpError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    favorite: {
      type: Boolean,
      required: [true, "Favorite is required"],
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    throw new HttpError(500, "Error fetching contacts from the database");
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new HttpError(500, "Error fetching contact from the database");
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    throw new HttpError(500, "Error deleting contact from the database");
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact.toObject({ versionKey: false });
  } catch (error) {
    throw new HttpError(500, "Error adding contact to the database");
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    throw new HttpError(500, "Error updating contact in the database");
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );
  } catch (error) {
    throw new HttpError(500, "Error updating contact status in the database");
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
