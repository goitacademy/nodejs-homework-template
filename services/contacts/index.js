const Contact = require("./schema");

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contact = new Contact({
    name,
    email,
    phone,
  });

  const result = contact.save();
  return result;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
