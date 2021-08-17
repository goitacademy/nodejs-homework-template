const { Contact } = require('../models')

const getAll = () => {
  return Contact.find({}, "_id name lastName email phone");
};

const getById = (id) => {
  return Contact.findById(id, "_id name lastName email phone");
};

const add = (newContact) => {
  return Contact.create(newContact);
};

const updateById = (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = (id) => {
  return Contact.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  add,
  getById,
  updateById,
  deleteById,
};