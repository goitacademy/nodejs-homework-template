const { Contact } = require("../db/contactsModel");

const getContact = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const deleteContact = async (id) => {
  await Contact.findByIdAndRemove(id);
};

const addContact = async ({ name, email, phone }) => {
  const newContact = new Contact({
    name,
    email,
    phone,
  });
  await newContact.save();
  return newContact;
};
const updateContact = async (id, { name, email, phone }) => {
  const contact = await getContactById(id);
  const newContact = {
    name: name || contact.name,
    email: email || contact.email,
    phone: phone || contact.phone,
  };
  await Contact.findByIdAndUpdate(id, { $set: newContact });
};

const updateStatusContact = async (id, { favorite }) => {
  const updateContact = await Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite } },
    { new: true }
  );
  return updateContact;
};

module.exports = {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact,
};
