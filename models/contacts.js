// models/contacts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
const { Schema } = mongoose;

dotenv.config();

const { DB_CONNECTION_STRING } = process.env;

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
  process.exit(1);
});

db.once("open", () => {
  console.log("Database connection successful");
});

const contactSchema = new Schema({
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

const Contact = mongoose.model("Contact", contactSchema);

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error(`Error listing contacts: ${error.message}`);
    throw new Error("Error listing contacts");
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    throw new Error(`Error getting contact by ID: ${error.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndRemove(contactId);
  } catch (error) {
    throw new Error(`Error removing contact: ${error.message}`);
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    throw new Error(`Error adding contact: ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    throw new Error(`Error updating contact: ${error.message}`);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    if (!body.favorite) {
      throw new Error("missing field favorite");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error("Contact not found");
    }

    return updatedContact;
  } catch (error) {
    throw new Error(`Error updating contact status: ${error.message}`);
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
