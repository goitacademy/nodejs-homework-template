const Contact = require("../models/contact.js");

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

const getContactById = async (id) => {
  const result = await Contact.findById(id);
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndDelete(id);
  return result || null;
};

const addContact = async (name, email, phone) => {
  const result = await Contact.create({
    name: name,
    email: email,
    phone: phone,
  });
  return result;
};

const updateContact = async (id, name, email, phone) => {
  const oldContact = await Contact.findById(id);
  if (name) {
    oldContact.name = name;
  }
  if (email) {
    oldContact.email = email;
  }
  if (phone) {
    oldContact.phone = phone;
  }
  return await oldContact.save();
};
const updateStatusContact = async (id, status) => {
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite: status },
    { returnDocument: "after" }
  );
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
