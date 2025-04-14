const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contact = model("Contact", contactSchema);

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error("Error listing contacts:", error.message);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error("Error getting contact by id:", error.message);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove(contactId);
  } catch (error) {
    console.error("Error removing contact:", error.message);
    return null;
  }
};

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error.message);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    console.error("Error updating contact:", error.message);
    return null;
  }
};

const updateStatusContact = async (contactId, { favorite }) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact status:", error.message);
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
