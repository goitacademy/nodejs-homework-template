const { Contact } = require('../models/contactsModel');

const create = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

const findAll = async () => {
  const data = await Contact.find();
  return data;
};

const findOne = async (id) => {
  const data = await Contact.findById(id);
  return data;
};

const update = async (id, data) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true });
  return updatedContact;
};

const updateFavorite = async (id, data) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true });
  return updatedContact;
};

const remove = async (id) => {
  const data = await Contact.findByIdAndRemove(id);
  return data;
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  updateFavorite,
  remove,
};