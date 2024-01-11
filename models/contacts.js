const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
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

const contactsDB = mongoose.model("Contact", contactsSchema);

const listContacts = async () => {
  const result = await contactsDB.find();
  return result;
};

const getContactById = async (contactId) => {
  if (!mongoose.isValidObjectId(contactId)) {
    return null;
  }
  const contact = await contactsDB.findById(contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await contactsDB.findByIdAndDelete(contactId);
  return contacts;
};

const addContact = async (body) => {
  const { name, email, phone, favorite } = body;

  const newContact = {
    name: name,
    email: email,
    phone: phone,
    favorite: favorite,
  };

  await contactsDB.create(newContact);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone, favorite } = body;
  const updateContact = {
    name: name,
    email: email,
    phone: phone,
    favorite: favorite,
  };
  await contactsDB.findByIdAndUpdate(contactId, updateContact);
  return updateContact;
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  updateFavoriteContact = {
    favorite: favorite,
  };
  await contactsDB.findByIdAndUpdate(contactId, updateFavoriteContact);
  const result = await getContactById(contactId);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
