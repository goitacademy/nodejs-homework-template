const Contact = require("../models");

const getAll = async () => {
  return await Contact.find({});
};

const getById = async (Id) => {
  return await Contact.findOne({_id: Id});
};

const add = async (body) => {
  return await Contact.create(body);
};

const update = async (Id, body) => {
  return await Contact.findByIdAndUpdate({_id: Id}, {...body}, {new: true});
};

const remove = async (contactId) => {
  return await Contact.findByIdAndRemove({_id: contactId});
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
