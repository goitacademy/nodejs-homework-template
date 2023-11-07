const Contact = require("./schemas/contactSchema");

const listContacts = async () => {
 return Contact.find();
};

const getContactById = (contactId) => {
 return Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
 return Contact.findByIdAndDelete(contactId);
};
const addContact = async ({ name, phone, email, favorite }) => {
 return Contact.create({ name, phone, email, favorite });
};

const updateContact = (contactId, fields) => {
 return Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

const updateStatusContact = (contactId, body) => {
 return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};
module.exports = {
 listContacts,
 getContactById,
 removeContact,
 addContact,
 updateContact,
 updateStatusContact,
};
