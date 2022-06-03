const { Contact } = require("../models/contact");

const getAll = async () => {
  return Contact.find({});
};

const getById = async (id) => {
  return Contact.findById(id);
};

const create = async (contact) => {
  return Contact.create(contact);
};

const updateById = async (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, { new: true });
};

const deleteById = async (id) => {
  return Contact.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
