const Contact = require("../models");

const getAll = async () => {
  return await Contact.find({});
};

const getById = async (contactId) => {
  return await Contact.findOne({_id: contactId});
};

const add = async (body) => {
  return await Contact.create(body);
};

const update = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    {_id: contactId},
    {...body},
    {new: true}
  );
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
