const Contact = require("../models").contact.Model;

const getAll = async () => {
  return Contact.find();
};

const getById = async (id) => {
  return Contact.findById(id);
};

const add = async ({name, email, phone}) => {
  return Contact.create({name, email, phone});
};

const delById = async (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateById = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const patchFavoriteById = async (id, fields) => {
  const {favorite} = fields;
  return Contact.findByIdAndUpdate({ _id: id }, {favorite}, { new: true });
};

module.exports = {
  getAll,
  getById,
  add,
  delById,
  updateById,
  patchFavoriteById,
};
