const { Contact } = require("../../models");

const findAll = (filter) => {
  if (filter.favorite) return Contact.find(filter);
  return Contact.find();
};

const find = (id) => Contact.findById(id);

const create = (newContact) => Contact.create(newContact);

const edit = (id, contact) =>
  Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });

const remove = (id) => Contact.findByIdAndDelete(id);

module.exports = {
  findAll,
  find,
  create,
  edit,
  remove,
};
