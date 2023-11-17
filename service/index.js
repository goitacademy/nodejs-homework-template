const Contact = require("./schemas/index");

const getAllContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findOne({ _id: id });
};

const createContact = async (body) => {
  return await Contact.create(body);
};

const removeContact = async (id) => {
  return await Contact.deleteOne({ _id: id });
};

const updateContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, {
    new: true,
    upsert: false,
  });
};

const updateStatus = async (id, isFavorite) => {
  return await Contact.findOneAndUpdate(
    { _id: id },
    { $set: { favorite: isFavorite } },
    { new: true }
  );
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatus,
};
