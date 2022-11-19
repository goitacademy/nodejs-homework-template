const { Contact } = require("../schemas/contactSchema");

const getAllContacts = async () => await Contact.find();

const getContactById = async (id) => await Contact.findOne({ _id: id });

const createTask = ({ title, text }) => {
  return Contact.create({ title, text });
};

const updateTask = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeTask = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllContacts,
  getContactById,
  createTask,
  updateTask,
  removeTask,
};
