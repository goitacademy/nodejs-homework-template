const Contact = require("./schemas/contact");

// const contacts = require("./contacts.json");

const listContacts = async () => {
  const results = await Contact.find();
  return results;
};

const getContactById = async (contactId) => {
  const results = await Contact.findOne({ _id: contactId });
  return results;
};

const removeContact = async (contactId) => {
  const results = await Contact.findByIdAndRemove({ _id: contactId });
  return results;
};

const addContact = async (body) => {
  try {
    const results = await Contact.create(body);
    return results;
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  const results = await Contact.findByIdAndUpdate(
    {
      _id: contactId,
    },
    { ...body },
    { new: true }
  );
  return results;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
