const Contact = require("./schemas/contact");


const getAllContacts = async (userId) => {
  return await Contact.find({ owner: userId });
};

const getContactById = async (userId, id) => {
  return await Contact.findOne({ _id: id, owner: userId });
};

const createContact = async (userId, { name, email, phone, favorite }) => {
  return await Contact.create({ name, email, phone, favorite, owner: userId });
};

const updateContact = async (userId, id, fields) => {
  return await Contact.findOneAndUpdate({ _id: id, owner: userId }, fields, {
    new: true,
    runValidators: true,
  });
};

const removeContact = async (userId, id) => {
  return await Contact.findOneAndDelete({ _id: id, owner: userId });

};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
