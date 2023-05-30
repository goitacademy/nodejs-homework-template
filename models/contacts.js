const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vovichkyry:v0zcv0VpVgo59nKr@cluster0.gf7lsqq.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection error:"));
db.once("open", () => {
  console.log("Database connection successful");
});

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

const Contact = mongoose.model("Contact", contactSchema);

async function listContacts() {
  try {
    const contacts = await Contact.find();
    console.log(Contact)
    return contacts;
  } catch (error) {
    throw new Error("Error retrieving contacts: " + error.message);
  }
}

async function getById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    throw new Error("Error retrieving contact: " + error.message);
  }
}

async function addContact(contact) {
  try {
    const newContact = await Contact.create(contact);
    return newContact;
  } catch (error) {
    throw new Error("Error adding contact: " + error.message);
  }
}

async function removeContact(contactId) {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw new Error("Contact not found");
    }
    return result;
  } catch (error) {
    throw new Error("Error deleting contact: " + error.message);
  }
}

async function updateContact(contactId, update) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, update, {
      new: true,
    });
    if (!updatedContact) {
      throw new Error("Contact not found");
    }
    return updatedContact;
  } catch (error) {
    throw new Error("Error updating contact: " + error.message);
  }
}

async function updateStatusContact(contactId, favorite) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      throw new Error('Contact not found');
    }
    return updatedContact;
  } catch (error) {
    throw new Error('Error updating contact status: ' + error.message);
  }
}


module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
};
