const Contact = require("./schemas/contacts");

const getAll = async () => {
  return Contact.find();
};

const getById = (id) => {
  return Contact.findById(id);
};

const create = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const update = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const remove = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  //  updateStatus,
};
