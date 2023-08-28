import Contact from "./models/contacts.js";

const getContacts = async () => {
  try {
    return await Contact.find();
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async id => {
  try {
    return await Contact.findById(id);
  } catch (err) {
    console.error(err.message);
  }
};

const createContact = async body => {
  try {
    return Contact.create(body);
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async id => {
  try {
    return await Contact.findByIdAndRemove(id);
  } catch (err) {
    console.error(err.message);
  }
};

const updateContact = async (id, body) => {
  try {
    return await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
  } catch (err) {
    console.error(err.message);
  }
};

const service = {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
};

export default service;
