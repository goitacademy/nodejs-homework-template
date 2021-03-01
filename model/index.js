const Contact = require("./schema/shema-contacts");

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return result;
};

async function listContacts() {
  const results = await Contact.find({});
  return results;
}

async function getContactById(contactId) {
  const result = await Contact.find({ _id: contactId }).toArray();
  return result;
}

async function removeContact(contactId) {
  const result = await Contact.findByIdAndRemove({
    _id: contactId,
  });
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
