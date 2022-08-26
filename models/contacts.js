// const fs = require("fs/promises");
const path = require("path");
// const { v4: uuidv4 } = require("uuid");
// const contactsPath = path.join(__dirname, "../models/contacts.json");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../.env") });
async function main() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "db-contacts" });
}
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contacts", contactSchema);

const listContacts = async () => {
  try {
    const data = await Contact.find({});

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await Contact.findById(contactId);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await Contact.findByIdAndRemove(contactId);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const data = new Contact({ ...body });
    await data.save();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate(contactId, body);
    const data = await Contact.findById(contactId);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate(contactId, body);
    const data = await Contact.findById(contactId);
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  main,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
