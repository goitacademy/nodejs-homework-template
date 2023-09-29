const Contact = require("../schemas/contact");

const listContacts = async () => {
  try {
    const data = await Contact.find();
    return data;
  } catch (error) {
    console.error("database error:", error);
  }
};

const getContactById = async (contactId) => {
  const findContact = (await Contact.findOne({ _id: contactId })) || {
    message: "contact, no found",
  };
  return findContact;
};

const addContact = async (body) => {
  console.log(body);
  const newContact = await Contact.create(body);
  return newContact;
};
const removeContact = async (contactId) => {
  const removedContact = await Contact.findOneAndRemove({ _id: contactId });
  const response = removedContact
    ? { removedContact, message: "Contact deleted" }
    : { message: "Contact, no found" };
  return response;
};

const updateContact = async (contactId, dataUpdate) => {
  const updatedContact = await Contact.findOneAndUpdate({ _id: contactId }, dataUpdate, {
      new: true, })
  const response = updatedContact
    ? { updatedContact, message: "Contact updated" }
    : { message: "Contact, no found" };
  return response;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
