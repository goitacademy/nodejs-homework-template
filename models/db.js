const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:3000/contacts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exit(1);
  }
};

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: String,
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error("Error listing contacts:", error.message);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.error("Error getting contact by id:", error.message);
    throw error;
  }
};

const addContact = async (contact) => {
  try {
    const newContact = await Contact.create(contact);
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error.message);
    throw error;
  }
};

const removeContact = async (id) => {
  try {
    const result = await Contact.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error removing contact:", error.message);
    throw error;
  }
};

const updateContact = async (id, updatedContact) => {
  try {
    const result = await Contact.updateOne({ _id: id }, updatedContact);
    return result.nModified > 0;
  } catch (error) {
    console.error("Error updating contact:", error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
