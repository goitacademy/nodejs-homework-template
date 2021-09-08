const { Contact } = require("../models");


const getAll = (pagination, filter) => {
   const { page, limit } = pagination;
   const skip = page * limit - limit;
   return Contact.find(filter, "_id name", { skip, limit: +limit });
  // return Contact.find({}, "_id name email phone favorite");
};

const getById = (id) => {
    return Contact.findById(id, "_id name email phone favorite");
};

const add = (newContact) => {
  return Contact.create(newContact);
};

const updateById = (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

const updateStatusContact = (id, data) => {
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
  updateStatusContact,
  deleteById,
};
